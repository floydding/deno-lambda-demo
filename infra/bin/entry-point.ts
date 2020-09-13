#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import LambdaStack from '../cdk/lambda-stack'

const app = new App()

new LambdaStack(app, 'LambdaStack')