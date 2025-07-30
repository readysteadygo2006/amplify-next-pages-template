import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { functionWithDataAccess } from './functions/data-access/resource';

defineBackend({
  auth,
  data,
  functionWithDataAccess,
});
