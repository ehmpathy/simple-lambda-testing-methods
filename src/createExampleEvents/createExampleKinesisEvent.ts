import { KinesisStreamEvent } from 'aws-lambda';
import { EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED } from './eventMetadataWhichShouldNotBeNeeded';

/**
 * creates a kinesis event for each message you give it:
 * - matches the shape of the kinesis event that aws would have triggered your lambda with
 * - automatically base64 encodes your message just like kinesis will do
 */
export const createExampleKinesisEvent = ({ messages }: { messages: string[] }): KinesisStreamEvent => ({
  Records: messages.map((message) => {
    return {
      awsRegion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventID: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventName: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventSource: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventSourceARN: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventVersion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      invokeIdentityArn: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      kinesis: {
        approximateArrivalTimestamp: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        data: Buffer.from(message).toString('base64'), // base64 encode the message, like kinesis will do
        kinesisSchemaVersion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        partitionKey: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        sequenceNumber: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      },
    };
  }),
});
