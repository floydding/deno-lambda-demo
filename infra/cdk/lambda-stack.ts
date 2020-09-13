import { Stack, App, StackProps } from '@aws-cdk/core'
import { CfnApplication } from '@aws-cdk/aws-sam'
import { LayerVersion, Function, Code, Runtime } from '@aws-cdk/aws-lambda'
import { LambdaRestApi } from '@aws-cdk/aws-apigateway'

export default class LambdaStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const denoRuntime = new CfnApplication(this, 'DenoRuntime', {
      location: {
        applicationId: 'arn:aws:serverlessrepo:us-east-1:390065572566:applications/deno',
        semanticVersion: '1.3.3'
      }
    })

    const denoLayer = LayerVersion.fromLayerVersionArn(this, 'DenoRuntimeLayer',
      denoRuntime.getAtt('Outputs.LayerArn').toString())

    const serviceFunction = new Function(this, 'ServiceFunction', {
      runtime: Runtime.PROVIDED,
      code: Code.fromAsset('../src/lambda.zip'),
      handler: 'index.handler',
      layers: [denoLayer]
    })

    new LambdaRestApi(this, 'API', {
      handler: serviceFunction
    })
  }
}