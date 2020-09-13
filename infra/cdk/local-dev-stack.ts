import { join } from 'path'
import { Stack, App, StackProps } from '@aws-cdk/core'
import { CfnFunction } from '@aws-cdk/aws-sam'
import * as dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../.env.dev') })

export default class LocalDevStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    new CfnFunction(this, 'ServiceFunction-local-instance', {
      codeUri: join(__dirname, '/../../src'),
      handler: 'index.handler',
      runtime: 'provided',
      layers: [process.env.DENO_LAYER_ARN as string],
      events: {
        fullProxy: {
          type: 'Api',
          properties: {
            path: '/{proxy+}',
            method: 'ANY'
          }
        }
      }
    })
  }
}