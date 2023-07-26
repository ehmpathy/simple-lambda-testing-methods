import { SNSEvent } from 'aws-lambda';

import { createExampleSNSEvent } from './createExampleSNSEvent';

describe('createExampleSNSEvent', () => {
  it('should create an accurate looking sns event', () => {
    const event: SNSEvent = createExampleSNSEvent({
      messages: ['hello', 'there'],
    });
    expect(event).toMatchSnapshot();
  });
});
