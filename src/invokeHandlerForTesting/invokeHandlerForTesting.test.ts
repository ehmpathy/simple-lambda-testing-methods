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
  describe('deployed lambda parity', () => {
    it('should strip any non-serializable data from the event payload, since only serializable data can be passed through the wire and reach deployed lambdas', async () => {
      class CoolThing {
        public cool: boolean;
        constructor() {
          this.cool = true;
        }
      }
      const theHandler = jest.fn(async ({ thing }: { thing: { cool: boolean } }) => {
        if (thing instanceof CoolThing) throw new Error('information about instantiation can not go over the wire. this should not be reached');
        return { cool: thing.cool, constructor: thing.constructor.name };
      });
      const result = await invokeHandlerForTesting({ event: { thing: new CoolThing() }, handler: theHandler }); // this should not throw an error about the instance
      expect(result.cool).toEqual(true);
      expect(result.constructor).toEqual('Object');
      expect(result.constructor).not.toEqual('CoolThing');
    });
    it('should serialize any non-primitive data in the response payload, since only serializable data can be passed through the wire and return from deployed lambdas', async () => {
      const theHandler = jest.fn(async () => {
        return { now: new Date() }; // a Date instance can not be sent directly over the wire, the lambda will serialize it
      });
      const result = await invokeHandlerForTesting({ event: {}, handler: theHandler }); // this should not throw an error about the instance
      expect(typeof result.now).toEqual('string');
    });
  });
});
