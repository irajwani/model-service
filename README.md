## Description

Model-Service to create and manage meta-models

## Installation

```bash
$ git clone <this-repo>
$ npm install
```

## Running the app

```bash
$ docker build -t model-service .
$ docker-compose up
```

Or 

```bash
$ docker pull irajwani/model-service
```

Or

```bash
$ npm run dev
$ npm run test
```

and run a mongo container within docker on port 27017

## Usage

Simply visit the [swagger documentation](http://localhost:3000/documentation) to see all available endpoints and their required parameters

You can connect to the mongodb instance within a GUI for mongo with connection string 'mongodb://localhost:27017'

## Standard User Story:

- Create a model
- Retrieve the model by ID
- Patch a model, and play around with deltas mechanism, like in assignment description

I've added comments within the code base for any other shortcomings in the system design that would be detrimental in a production grade repo.
