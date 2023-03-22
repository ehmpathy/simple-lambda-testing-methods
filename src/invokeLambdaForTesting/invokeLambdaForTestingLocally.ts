import findRoot from 'find-root';
import fs from 'fs';
import { LambdaInvocationError } from 'simple-lambda-client';
import YAML from 'yaml';

import { invokeHandlerForTesting } from '../invokeHandlerForTesting/invokeHandlerForTesting';

/**
 * open the serverless.yml, lookup the path to the fn, import it, and call it
 */
export const invokeLambdaForTestingLocally = async ({
  service: serviceName,
  function: functionName,
  stage,
  event,
}: {
  service: string;
  function: string;
  stage: string;
  event: any;
}) => {
  const workingDirectory = process.env.PWD; // grab the directory of the project the user is in
  if (!workingDirectory) throw new Error('could not detect working directory w/ process.env.PWD'); // fail fast if this assumption is not satisfied
  const projectRoot = findRoot(workingDirectory);

  // find the serverless.yml
  const serverlessConfigYml = fs.readFileSync(`${projectRoot}/serverless.yml`, 'utf8');

  // read the serverless.yml
  const serverlessConfig = YAML.parse(serverlessConfigYml);

  // sanity check that the config.service-name = serviceName; fail fast for the user
  if (serverlessConfig.service !== serviceName)
    throw new Error(
      `serverless config service name does not match; serverless.yml#service=\`${serverlessConfig.service}\`, expected=\`${serviceName}\``,
    );

  // find the function definition
  const functionConfig = serverlessConfig.functions[functionName];
  if (!functionConfig)
    throw new Error(
      `serverless config does not have a definition for function \`${functionName}\`; are you sure serverless.yml#functions.${functionName} is defined?`,
    );

  // lookup the "handler" it defined for this function
  const matches = functionConfig.handler.match(new RegExp(/([\w+/]+)\.(\w+)/));
  if (!matches)
    throw new Error(
      // eslint-disable-next-line no-useless-escape
      `serverless.yml#functions.${functionName}.handler is malformed; must match regex \`/([\w+/]+)\.(\w+)/\``, // if we find a usecase where this is not sufficient, we can get more advanced then
    );
  const handlerPath = `${projectRoot}/${matches[1]}`;
  const handlerExport = matches[2];

  // import the requested file
  const handlerFile = await (async () => {
    try {
      return await import(handlerPath);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      if (error.message.includes('Cannot find module')) throw new Error(`no file was found at handler.path \`${handlerPath}\``); // if we can add context to the error, throw our own error with more context
      throw error; // otherwise, we cant add more context - just throw the orig error
    }
  })();

  // grab the handler method from the handler file
  const handlerMethod = handlerFile[handlerExport];
  if (!handlerMethod) throw new Error(`no function was exported from file at handler.path \`${handlerPath}\``);

  // invoke the function. make the response look like what aws-lambda would return for the response (e.g., error => error shape response)
  const payload: any = await (async () => {
    try {
      return await invokeHandlerForTesting({ event, handler: handlerMethod });
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      return {
        errorType: error.constructor.name,
        errorMessage: error.message,
      };
    }
  })();

  // throw a LambdaInvocationError if the result had an error shape to match the response of the live invocation (https://github.com/uladkasach/simple-lambda-client/blob/92f4cff035000de4bd71034c2a99e0d70ab45859/src/executeLambdaInvocation.ts#L38)
  const isAnErrorPayload =
    !!payload && // if the response exists and is truthy, then it may be an error object
    (false || // check if any of the following properties exist in the payload (since some responses may exclude one or the other)
      payload.errorMessage ||
      payload.errorType ||
      payload.stackTrace);
  if (isAnErrorPayload) throw new LambdaInvocationError({ response: payload, lambda: `${serviceName}-${stage}-${functionName}`, event });

  // otherwise, return the result
  return payload;
};
