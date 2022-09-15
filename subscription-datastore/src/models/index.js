// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Chat } = initSchema(schema);

export {
  Todo,
  Chat
};