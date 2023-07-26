import { S3Event } from 'aws-lambda';

import { EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED } from './eventMetadataWhichShouldNotBeNeeded';

/**
 * create an example s3 event that can be used for testing
 *
 * ref
 * - https://docs.aws.amazon.com/AmazonS3/latest/dev/notification-content-structure.html
 */
export const createExampleS3Event = ({
  s3Bucket,
  s3ObjectKey,
  s3ObjectSize = EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
  eventType = 's3:ObjectCreated:Put',
}: {
  /**
   * the name of the s3 bucket
   */
  s3Bucket: string;

  /**
   * the key of the s3 object
   */
  s3ObjectKey: string;

  /**
   * the size of the s3 object
   */
  s3ObjectSize?: number;

  /**
   * a type of s3 event that can be emitted
   *
   * ref
   * - https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-event-types
   */
  eventType?: string;
}): S3Event => ({
  Records: [
    {
      eventVersion: '2.1',
      eventSource: 'aws:s3',
      awsRegion: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      eventTime: new Date().toISOString(),
      eventName: eventType.replace(/^s3:/, ''), // e..g., s3:ObjectCreated:Put => ObjectCreated:Put
      userIdentity: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      requestParameters: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      responseElements: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
      s3: {
        s3SchemaVersion: '1.0',
        configurationId: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        bucket: {
          arn: `arn:aws:s3:::${s3Bucket}`,
          name: s3Bucket,
          ownerIdentity: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        },
        object: {
          key: s3ObjectKey,
          size: s3ObjectSize,
          eTag: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          versionId: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
          sequencer: EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED,
        },
      },
    },
  ],
});
