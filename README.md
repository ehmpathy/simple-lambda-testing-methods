# simple-lambda-testing-methods

a simple library made to make it easy to test lambdas and handlers, deployed and locally.

# installation

```
npm install --save simple-lambda-testing-methods
```

# usage

### `invokeHandlerForTesting`

When you have a handler that uses the callback pattern (e.g., [middy]() based handlers), you can use this method to interact with it using `async/await` instead.

This is useful for unit tests and integration tests.

```ts
import { invokeHandlerForTesting } from 'simple-lambda-testing-methods';
import { handler } from `src/handlers/sendUserNotification.ts`;

const response = await invokeHandlerForTesting({
  handler,
  event: { important: 'data' },
});
```

### `invokeLambdaForTesting`

When you'd like to actually invoke your live, deployed lambda, for an acceptance test for example, this function will let you do so with a convenient api. It uses [`simple-lambda-client`]() under the hood, so that you'll see the same response exact any clients of this lambda would see.

```ts
import { invokeLambdaForTesting } from 'simple-lambda-testing-methods';

const response = await invokeLambdaForTesting({
  service: 'svc-notifications',
  function: 'sendUserNotification',
  stage: 'prod',
  event: { important: 'data' },
});
```

If you're using the `serverless` framework (i.e., you have a `serverless.yml` file in your project's root), then this method can also allow you to invoke your lambda locally when setting the `locally` flag.

```ts
import { invokeLambdaForTesting } from 'simple-lambda-testing-methods';

const response = await invokeLambdaForTesting({
  service: 'svc-notifications',
  function: 'sendUserNotification',
  stage: 'prod',
  locally: true,
  event: { important: 'data' },
});
```

When running with the locally flag, this method will simply lookup your function's file path from the `serverless.yml`, import the function, and invoke it using the `invokeHandlerForTesting` method. Its a nice sanity check that helps debug differences in the same exact test between your deployed code and the same code locally.
