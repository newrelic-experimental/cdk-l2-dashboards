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