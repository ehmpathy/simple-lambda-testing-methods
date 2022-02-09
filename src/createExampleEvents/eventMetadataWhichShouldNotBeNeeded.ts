/**
 * represents a value of metadata which should not be needed
 * - i.e., hardcoded to undefined since ideally it would not be used in a lambda
 *
 * why not?
 * - because it would couple the contract of a lambda too closely with aws-specific + event-trigger-specific + lambda-api-specific metadata
 * - contract should be based on request _data_, not environment specific _metadata_
 * - contract should be based on data that we can control
 */
export const EVENT_METADATA_WHICH_SHOULD_NOT_BE_NEEDED = undefined as any;
