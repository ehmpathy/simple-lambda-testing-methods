import { APIGatewayEvent } from 'aws-lambda';

import { EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED } from './eventMetadataWhichShouldNotBeNeeded';

export const createExampleAPIGatewayEvent = ({
  body,
  httpMethod,
  isBase64Encoded = false,
  headers = {
    'Content-Type': 'application/json',
  },
  path = '__path__',
  pathParameters = null,
  queryStringParameters = null,
}: {
  body: string;
  httpMethod: 'POST' | 'GET';
  /**
   * aws will tell us whether they think the body is a base64 encoded binary or not, based on the headers
   *
   * ref: https://aws.amazon.com/blogs/compute/handling-binary-data-using-amazon-api-gateway-http-apis/
   */
  isBase64Encoded?: boolean;
  headers?: Record<string, string>;
  path?: string;
  pathParameters?: Record<string, string> | null;
  queryStringParameters?: Record<string, string> | null;
}): APIGatewayEvent => {
  return {
    path,
    pathParameters,
    queryStringParameters,
    multiValueQueryStringParameters: queryStringParameters
      ? Object.fromEntries(
          Object.entries(queryStringParameters).map(([key, value]) => [
            key,
            [value],
          ]),
        )
      : null,
    body,
    headers,
    multiValueHeaders: Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key, [value]]),
    ),
    httpMethod,
    isBase64Encoded,
    stageVariables: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
    requestContext: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
    resource: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
  };
};
