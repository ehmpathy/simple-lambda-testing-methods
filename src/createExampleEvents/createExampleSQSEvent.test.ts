import { SQSEvent } from 'aws-lambda';
import { createExampleSQSEvent } from './createExampleSQSEvent';

describe('createExampleSQSEvent', () => {
  it('should create an accurate looking sns event', () => {
    const event: SQSEvent = createExampleSQSEvent({ messages: ['hello', 'there'] });
    expect(event).toMatchSnapshot();
  });
});
