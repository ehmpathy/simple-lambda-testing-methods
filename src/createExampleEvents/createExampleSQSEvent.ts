import { SQSEvent } from 'aws-lambda';

import { EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED } from './eventMetadataWhichShouldNotBeNeeded';

export const createExampleSQSEvent = ({
  messages,
}: {
  messages: string[];
}): SQSEvent => ({
  Records: messages.map((message) => {
    return {
      messageId: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      receiptHandle: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      body: message,
      attributes: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      messageAttributes: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      md5OfBody: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventSource: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventSourceARN: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      awsRegion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
    };
  }),
});
