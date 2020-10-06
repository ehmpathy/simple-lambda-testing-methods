import findRoot from 'find-root';

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
      expect(error.message).toContain(
        'serverless config service name does not match; serverless.yml#service=`svc-example`, expected=`svc-example-different`',
      );
    }
  });
  it('should complain if we stage !== process.env.SERVERLESS_STAGE, since we assume thats how user defines stage for local invocations', async () => {
    try {
      await invokeLambdaForTestingLocally({
        service: 'svc-example',
        function: 'doCoolThing',
        stage: 'prod',
        event: { important: true },
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toContain('env stage does not match; process.env.SERVERLESS_STAGE=`undefined`, expected=`prod`');
    }
  });
  it('should be able to correctly invoke the desired function, by finding its path through serverless.yml', async () => {
    process.env.SERVERLESS_STAGE = 'prod';
    const result = await invokeLambdaForTestingLocally({
      service: 'svc-example',
      function: 'doCoolThing',
      stage: 'prod',
      event: { important: true },
    });
    expect(result).toEqual('__EXAMPLE_RESPONSE__');
  });
});
