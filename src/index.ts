import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DashboardInput } from './gql/graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLClient } from 'graphql-request';
import {CreateDashboardMutationVariables, getSdk} from "./sdk";

export interface DashboardCreateProps{
   AccountId: number;
   Dashboard: DashboardInput;

}
export class Dashboard extends Construct {
   constructor(scope: Construct, id: string, props: CreateDashboardMutationVariables) {
      super(scope, id);
      const endpoint = `https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`;

      const graphQLClient = new GraphQLClient(endpoint, {
         headers: {
            authorization: `Bearer MY_TOKEN`,
         },
      });

      const sdk = getSdk(graphQLClient);
      try {
         const dashboard = await sdk.CreateDashboard(props);
         dashboard.data.dashboardCreate.entityResult.guid;
      } catch (error) {
      }
      // const destination = new CfnAiNotificationsDestination(this, 'L2 AINotificationsChannel Destination', { destination: destinationFragment });
      // new CfnOutput(this, 'DestinationId', {
      //    exportName: 'DestinationId',
      //    value: destination.attrId,
      // });
   }

   wrapper(props: CreateDashboardMutationVariables){

   }
}
