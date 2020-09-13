#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import LambdaStack from '../cdk/lambda-stack'
import LocalDevStack from '../cdk/local-dev-stack'

const app = new App()

new LambdaStack(app, 'LambdaStack')

// Local dev sam stack should NOT be deployed
new LocalDevStack(app, 'LocalDevStack')