import type { Handler } from 'aws-lambda';
import type { Schema } from '../../data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/data-access'; // replace with your function name

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>();

export const handler: Handler = async (event) => {
  console.log("event:", event);
  let eventArgs = JSON.parse(event.queryStringParameters.params);
  let eventContent = eventArgs.content; 
  console.log("eventContent:", eventContent);

  const { errors: createErrors, data: newTodo } = await client.models.Todo.create({
    content: eventContent,
    isDone: false,
  })

  console.log("handler:", handler);
  const { errors: listErrors, data: todos } = await client.models.Todo.list();
  console.log("todos:", todos);

  return event;
};