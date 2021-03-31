import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as cognito from '@aws-cdk/aws-cognito';

export class CdkTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const postLambda = this.createLambdaFunction("postLambda", "lambda", "postLambda.handler", this);
    const getLambda = this.createLambdaFunction("getLambda", "lambda", "getLambda.handler", this);
    const putLambda = this.createLambdaFunction("putLambda", "lambda", "putLambda.handler", this);

    this.createNewApiGateway(this, 'PostLambdaEndpoint', postLambda);
    this.createNewApiGateway(this, 'GetLambdaEndpoint', getLambda);
    this.createNewApiGateway(this, 'PutLambdaEndpoint', putLambda);  

    this.createNewUserPool(this, 'DemoUserPool');
  }

  createNewUserPool(scope: any, userpoolId: string){
    return new cognito.UserPool(scope, userpoolId);
  }

  createNewApiGateway(scope: any, apiGatewayId: string, handler: any){
    new apigw.LambdaRestApi(scope, apiGatewayId, {
      handler: handler
    });
  }

  createLambdaFunction(lambdaName: string, assetsFolder: string, handler: string, scope: any){
    return new lambda.Function(scope, lambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(assetsFolder),
      handler: handler
    })
  }
}


