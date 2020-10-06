import findRoot from 'find-root';
import fs from 'fs';
import YAML from 'yaml';

import { invokeHandlerForTesting } from '../invokeHandlerForTesting';

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

  // sanity check that the requested stage is the stage that is currently set (as defined by `SERVERLESS_STAGE` env var standard)
  const envStage = process.env.SERVERLESS_STAGE ?? (process.env.NODE_ENV === stage ? process.env.NODE_ENV : undefined); // fallback to node-env as a backup, for convenience, but only if it was a direct match
  if (stage !== envStage) throw new Error(`env stage does not match; process.env.SERVERLESS_STAGE=\`${envStage}\`, expected=\`${stage}\``);

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
      if (error.message.includes('Cannot find module')) throw new Error(`no file was found at handler.path \`${handlerPath}\``); // if we can add context to the error, throw our own error with more context
      throw error; // otherwise, we cant add more context - just throw the orig error
    }
  })();

  // grab the handler method from the handler file
  const handlerMethod = handlerFile[handlerExport];
  if (!handlerMethod) throw new Error(`no function was exported from file at handler.path \`${handlerPath}\``);

  // invoke the function
  return invokeHandlerForTesting({ event, handler: handlerMethod });
};
