import { invokeLambdaFunction } from 'simple-lambda-client';

/**
 * actually invoke the lambda
 */
export const invokeLambdaForTestingLive = ({
  service: serviceName,
  function: functionName,
  stage,
  event,
}: {
  service: string;
  function: string;
  stage: string;
  event: any;
}) =>
  invokeLambdaFunction({
    service: serviceName,
    function: functionName,
    stage,
    event,
  });
