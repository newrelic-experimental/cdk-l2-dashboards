import { Construct } from 'constructs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLError } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import {
   CreateDashboardMutation,
   CreateDashboardMutationVariables,
   GetDashboardQuery,
   GetDashboardQueryVariables,
   getSdk,
} from './sdk/sdk';

export type dashboardManagerConfig = {
   key: string;
   endpoint?: string;
};

export class DashboardManager extends Construct {

   private sdk: {
      CreateDashboard(variables: CreateDashboardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: CreateDashboardMutation;
         errors?: GraphQLError[];
         extensions?: any;
         headers: Headers;
         status: number;
      }>;
      GetDashboard(variables: GetDashboardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: GetDashboardQuery;
         errors?: GraphQLError[];
         extensions?: any;
         headers: Headers;
         status: number;
      }>;
   };
   private defaultEndpoint: string = 'https://api.newrelic.com/graphql';
   private readonly graphQLClient: GraphQLClient;

   constructor(scope: Construct, id: string, config: dashboardManagerConfig) {
      super(scope, id);
      if (config == null) {
         throw 'Missing required configuration';
      }

      if (config.key == null || config.key.trim() == '') {
         throw 'License key is required';
      }

      if (config.endpoint == null || config.endpoint.trim() == '') {
         config.endpoint = this.defaultEndpoint;
         console.warn('Using default NerdGraph endpoint: ' + config.endpoint);
      }
      this.graphQLClient = new GraphQLClient(config.endpoint, {
         headers: {
            'API-Key': config.key,
         },
      });

      this.sdk = getSdk(this.graphQLClient);

   }

   async create(props: CreateDashboardMutationVariables) {

      return this.sdk.CreateDashboard(props);
      //dashboard.data.dashboardCreate.entityResult.guid;
      // const destination = new CfnAiNotificationsDestination(this, 'L2 AINotificationsChannel Destination', { destination: destinationFragment });
      // new CfnOutput(this, 'DestinationId', {
      //    exportName: 'DestinationId',
      //    value: destination.attrId,
      // });
   }

}
