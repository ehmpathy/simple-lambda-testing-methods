import findRoot from 'find-root';
import { LambdaInvocationError } from 'simple-lambda-client';

import { invokeLambdaForTestingLocally } from './invokeLambdaForTestingLocally';

jest.mock('find-root');
const findRootMock = findRoot as jest.Mock;
findRootMock.mockReturnValue(`${__dirname}/../__test_assets__/exampleProject`); // mock that the `exampleProject` is the closest root

describe('invokeLambdaForTestingLocally', () => {
  it('should complain if the serverless.yml#service name is not the same as the expected service name', async () => {
    try {
      await invokeLambdaForTestingLocally({
        service: 'svc-example-different',
        function: 'doCoolThing',
        stage: 'prod',
        event: { important: true },
      });
      throw new Error('should not reach here');
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      expect(error.message).toContain(
        'serverless config service name does not match; serverless.yml#service=`svc-example`, expected=`svc-example-different`',
      );
    }
  });
  it('should be able to correctly invoke the desired function, by finding its path through serverless.yml', async () => {
    const result = await invokeLambdaForTestingLocally({
      service: 'svc-example',
      function: 'doCoolThing',
      stage: 'prod',
      event: { important: true },
    });
    expect(result).toEqual('__EXAMPLE_RESPONSE__');
  });
  it('should throw a LambdaInvocationError if the function threw an error while executing, to match result of live invocation', async () => {
    // aws lambda returns an error shape when the function throws an error. this error shape is detected by simple-lambda-client in live invocations and an error is thrown from it. so make sure we do that for local invocations too
    try {
      await invokeLambdaForTestingLocally({
        service: 'svc-example',
        function: 'doCoolThing',
        stage: 'prod',
        event: { throwError: true },
      });
      throw new Error('should not reach here');
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      expect(error).toBeInstanceOf(LambdaInvocationError);
      expect(error.message).toContain(`'svc-example-prod-doCoolThing': "example error!"`);
    }
  });
  it('should throw a LambdaInvocationError if the function returned something that had an error shape, to match result of live invocation', async () => {
    // when the function itself returns an error shape (e.g., BadRequestError -> errorShape), this error shape is detected by simple-lambda-client in live invocations and an error is thrown from it. so make sure we do that for local invocations too
    try {
      await invokeLambdaForTestingLocally({
        service: 'svc-example',
        function: 'doCoolThing',
        stage: 'prod',
        event: { returnErrorShape: true },
      });
      throw new Error('should not reach here');
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      expect(error).toBeInstanceOf(LambdaInvocationError);
      expect(error.message).toContain(`'svc-example-prod-doCoolThing': "example error shape!"`);
    }
  });
});
