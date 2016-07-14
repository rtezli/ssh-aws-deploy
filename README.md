# AWS SSH Deploying

Web service that deploys an EC2 instance that accepts SSH connections for a given username and password.

## Configuration

The service is configured with the following environment variables :

    LOG_LEVEL="debug"
    SERVICE_NAME="ssh-deploy"
    SERVICE_PORT=8080
    AWS_REGION="eu-central-1"
    AWS_INSTANCE_TYPE="t2.micro"
    AWS_VPC="vpc-xxxxxxxx"
    AWS_IMAGE_ID="ami-87564feb"
    AWS_ACCESS_KEY_ID="XXXXXXXXXXXXXXXXXXXX"
    AWS_SECRET_ACCESS_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

## Getting started

Do

    npm install
    npm start

## Interface

### Deploy

To deploy a SSH instance do :

    curl -v -X PUT -H "Content-Type: application/json" -d '{"username" : "foo", "password" : "bar", "callback" : "http://localhost:8080/callback" }' http://localhost:8080/ssh

### Destroy

To destroy a SSH instance do :

    curl -X DELETE -H "Content-Type: application/json" -d '{ "id" : "i-48c98df4" }' http://localhost:8080/ssh


## Limitations

The service does not wait for the instances to be ready and accepting connections.
