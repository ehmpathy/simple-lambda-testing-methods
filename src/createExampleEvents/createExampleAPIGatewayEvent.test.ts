import { APIGatewayEvent } from 'aws-lambda';

import { createExampleAPIGatewayEvent } from './createExampleAPIGatewayEvent';

describe('createExampleAPIGatewayEvent', () => {
  it('should create an accurate looking sns event', () => {
    const event: APIGatewayEvent = createExampleAPIGatewayEvent({
      body: JSON.stringify({ hello: 'there' }),
      httpMethod: 'POST',
    });
    expect(event).toMatchSnapshot();
  });
});
