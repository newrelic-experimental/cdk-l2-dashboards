import { Construct } from 'constructs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLError } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import {
   CreateDashboardMutation,
   CreateDashboardMutationVariables,
   DeleteDashboardMutation,
   DeleteDashboardMutationVariables,
   getSdk,
   ListDashboardsQuery,
   ListDashboardsQueryVariables,
   ReadDashboardQuery,
   ReadDashboardQueryVariables,
   UpdateDashboardMutation,
   UpdateDashboardMutationVariables,
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
      UpdateDashboard(variables: UpdateDashboardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: UpdateDashboardMutation;
         errors?: GraphQLError[];
         extensions?: any;
         headers: Headers;
         status: number;
      }>;
      DeleteDashboard(variables: DeleteDashboardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: DeleteDashboardMutation;
         errors?: GraphQLError[];
         extensions?: any;
         headers: Headers;
         status: number;
      }>;
      ListDashboards(variables?: ListDashboardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: ListDashboardsQuery;
         errors?: GraphQLError[];
         extensions?: any;
         headers: Headers;
         status: number;
      }>;
      ReadDashboard(variables: ReadDashboardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{
         data: ReadDashboardQuery;
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
         console.info('Using default NerdGraph endpoint: ' + config.endpoint);
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

   // TODO Update
   // TODO Delete
   // TODO Read
   async read(props: ReadDashboardQueryVariables) {
      return this.sdk.ReadDashboard(props);
   }

   // TODO List
}
