# Whale App Backend

This is a CDK project for creating AWS resources needed by the Whale App.

## Useful commands

- `cdk deploy` deploy this stack to your AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Local Deployment

```
cd deploy
export $(< ../.env)

export ENVIRONMENT=dev
cdk diff
cdk deploy

export ENVIRONMENT=prod
cdk diff
cdk deploy
```

## Components
