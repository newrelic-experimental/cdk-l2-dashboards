import * as cdk from 'aws-cdk-lib';
import { DashboardManager } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'DashboardManagerTestStack');

new DashboardManager(stack, 'DashboardManager');