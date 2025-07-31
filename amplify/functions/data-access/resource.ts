import { defineFunction } from '@aws-amplify/backend';

export const functionWithDataAccess = defineFunction({
  environment: {
    NAME: 'data-access',
  }
});