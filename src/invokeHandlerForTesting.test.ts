import { invokeHandlerForTesting } from './invokeHandlerForTesting';

describe('invokeHandlerForTesting', () => {
  describe('callback handlers', () => {
    it('calls callback style handler and gets response correctly', async () => {
      const theHandler = jest.fn(async (event, context, callback) => callback(undefined, '__RESULT__'));
      const result = await invokeHandlerForTesting({ event: { important: true }, handler: theHandler });
      expect(theHandler).toHaveBeenCalledTimes(1);
      expect(theHandler).toHaveBeenCalledWith({ important: true }, expect.any(Object), expect.any(Function));
      expect(result).toEqual('__RESULT__');
    });
    it('calls callback style handler and gets errors correctly', async () => {
      const theHandler = jest.fn(async (event, context, callback) => callback(new Error('bad thing')));
      try {
        await invokeHandlerForTesting({ event: { important: true }, handler: theHandler });
        throw new Error('should not reach here');
      } catch (error) {
        expect(error.message).toEqual('bad thing');
      }
    });
  });
  describe('async handlers', () => {
    it('calls async style handler and gets response correctly', async () => {
      const theHandler = jest.fn(async () => '__RESULT__');
      const result = await invokeHandlerForTesting({ event: { important: true }, handler: theHandler });
      expect(theHandler).toHaveBeenCalledTimes(1);
      expect(theHandler).toHaveBeenCalledWith({ important: true }, expect.any(Object), expect.any(Function));
      expect(result).toEqual('__RESULT__');
    });
    it('calls async style handler and gets errors correctly', async () => {
      const theHandler = jest.fn(async () => {
        throw new Error('bad thing');
      });
      try {
        await invokeHandlerForTesting({ event: { important: true }, handler: theHandler });
        throw new Error('should not reach here');
      } catch (error) {
        expect(error.message).toEqual('bad thing');
      }
    });
  });
});
