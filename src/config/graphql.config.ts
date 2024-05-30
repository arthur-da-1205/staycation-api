import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { NoSchemaIntrospectionCustomRule } from 'graphql';
import { join } from 'path';

export const GraphQL: MercuriusDriverConfig = {
  driver: MercuriusDriver,
  sortSchema: true,
  autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
  // subscriptions: {
  //   'graphql-ws': true,
  // },
  graphiql: false,
  // validationRules: [NoSchemaIntrospectionCustomRule],
};
