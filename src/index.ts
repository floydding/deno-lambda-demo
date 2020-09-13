import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'https://deno.land/x/lambda/mod.ts'

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const todo = await res.json()
  console.log('todo item', todo)
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(todo),
  };
}