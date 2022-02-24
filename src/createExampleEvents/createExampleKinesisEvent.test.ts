import { KinesisStreamEvent } from 'aws-lambda';
import { createExampleKinesisEvent } from './createExampleKinesisEvent';

describe('createExampleKinesisEvent', () => {
  it('should create an accurate looking sns event', () => {
    const event: KinesisStreamEvent = createExampleKinesisEvent({ messages: ['hello', 'there'] });
    expect(event).toMatchSnapshot();
  });
});
