import { App, Stack } from 'aws-cdk-lib';
import { TestConfiguration } from '../local/setupJest';
import { DashboardInput, DashboardPermissions } from '../src/gql/graphql';
import { DashboardManager } from '../src/index';


const mockApp = new App();
const stack = new Stack(mockApp);

test('Dashboard Create', async () => {
   const dm = new DashboardManager(stack, 'testing-stack', { key: TestConfiguration.LicenseKey });
   const x: DashboardInput = {
      permissions: DashboardPermissions.PublicReadOnly,
      description: 'L2 CDK Dashboard Create Test',
      name: 'L2DashboardCreate',
      pages: [{
         description: 'Page Description',
         name: 'Page Name',
         widgets: [{ title: 'Widget Title', configuration: { markdown: { text: 'Markdown text' } } }],
      }],
   };
   const result = await dm.create({ accountId: 1074083, dashboard: x });
   expect(result.errors).toBeUndefined();
});

// test('Lambda functions should be configured with properties and execution roles', () => {
//    template.hasResourceProperties('AWS::Lambda::Function', {
//       Runtime: 'nodejs16.x',
//    });
//
//    template.hasResourceProperties('AWS::IAM::Role', {
//       AssumeRolePolicyDocument: {
//          Statement: [
//             {
//                Action: 'sts:AssumeRole',
//                Effect: 'Allow',
//                Principal: {
//                   Service: 'lambda.amazonaws.com',
//                },
//             },
//          ],
//          Version: '2012-10-17',
//       },
//    });
// });
//
// test('HTTP API should be created', () => {
//    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
//       ProtocolType: 'HTTP',
//    });
// });
//
// test('Lambda Integration should be created', () => {
//    template.hasResourceProperties('AWS::ApiGatewayV2::Integration', {
//       IntegrationType: 'AWS_PROXY',
//    });
// });