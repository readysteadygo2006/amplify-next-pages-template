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
  let objType = eventArgs.objType; 
  let objUId = eventArgs.uId; 
  let objUserId = eventArgs.userId; 
  let objLastGet = eventArgs.lastGet; 
  console.log("eventArgs:", eventArgs);

  switch (objType) {
    case "system":
      const { errors: createErrors, data: newTodo } = await client.models.System.create({
        uId: objUId,
        userId: objUserId,
        lastGet: objLastGet,
      });
      break;
    default:
      console.log("Unknown objType:", eventArgs);
  }

  return event;
};