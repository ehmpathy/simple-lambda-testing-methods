import { invokeLambdaForTestingLive } from './invokeLambdaForTestingLive';
import { invokeLambdaForTestingLocally } from './invokeLambdaForTestingLocally';

export const invokeLambdaForTesting = ({
  service: serviceName,
  function: functionName,
  stage,
  locally = false,
  event,
}: {
  service: string;
  function: string;
  stage: string;
  locally?: boolean;
  event: any;
}) => {
  if (locally) return invokeLambdaForTestingLocally({ service: serviceName, function: functionName, stage, event });
  return invokeLambdaForTestingLive({ service: serviceName, stage, function: functionName, event });
};
