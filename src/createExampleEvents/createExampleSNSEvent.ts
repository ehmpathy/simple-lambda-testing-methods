import { SNSEvent } from 'aws-lambda';
import { EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED } from './eventMetadataWhichShouldNotBeNeeded';

export const createExampleSNSEvent = ({ messages }: { messages: string[] }): SNSEvent => {
  return {
    Records: messages.map((message) => {
      return {
        EventVersion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        EventSubscriptionArn: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        EventSource: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        Sns: {
          SignatureVersion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          Timestamp: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          Signature: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          SigningCertUrl: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          MessageId: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          Message: message,
          MessageAttributes: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          Type: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          UnsubscribeUrl: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          TopicArn: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          Subject: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        },
      };
    }),
  };
};
