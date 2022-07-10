import { StackContext, Api, Table} from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
  });

  const table = new Table(stack, 'Main', {
    fields: {
      PK: 'string',
      SK: 'string',
      GSI1SK: 'string',
      TTL: 'number',
    },
    primaryIndex: {partitionKey: 'PK', sortKey: 'SK'},
    globalIndexes: {
      GSI1: {partitionKey: 'SK', sortKey: 'GSI1SK'},
    },
    cdk: {
      table: {
        timeToLiveAttribute: 'TTL'
      }
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url
  });
}
