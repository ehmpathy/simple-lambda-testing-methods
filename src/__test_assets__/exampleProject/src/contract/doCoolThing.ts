export const handler = async (event: {
  returnErrorShape?: boolean;
  throwError?: boolean;
}) => {
  if (event.returnErrorShape)
    return {
      errorMessage: 'example error shape!',
      errorType: 'BadRequestError',
    };
  if (event.throwError) throw new Error('example error!');
  return '__EXAMPLE_RESPONSE__';
};
