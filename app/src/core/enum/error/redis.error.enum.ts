export enum REDIS_ERROR_CODE {
  DUPLICATE_KEY_ERROR = 'DUPLICATE_KEY_ERROR',
  INSERTION_FAILED_ERROR = 'INSERTION_FAILED_ERROR',
  DATA_NOT_FOUND_ERROR = 'DATA_NOT_FOUND_ERROR',
}
export enum REDIS_ERROR_MESSAGE {
  DUPLICATE_KEY_ERROR = 'The provided key already exists in the system.',
  INSERTION_FAILED_ERROR = 'Failed to insert the record into the system.',
  DATA_NOT_FOUND_ERROR = 'The requested key does not exist or contains no data.',
}
