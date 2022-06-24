## Description

Generic TS based deck-service to deal and manage french playing cards

## Installation

```bash
$ git clone <this-repo>
$ npm install
```

## Running the app

```bash
$ docker build -t deck-service .
$ docker-compose up
```

Then proceed to usage section

Alternatively, if you would like to run the app locally, and node_modules fail to install, it might be a node version issue (I used node 12.18.1)
In this case, install nvm with:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then follow the instructions provided to make 'nvm' command available within your terminal
Then,

```bash
$ nvm install 12.18.1
$ nvm use 12.18.1
$ npm i
$ npm run dev
```

and run a mongo container within docker

Important: Use an IDE like webstorm to set up a run configuration and provide an ENV value for ACCESS_TOKEN_SECRET_KEY

## Usage

Simply visit the [swagger documentation](http://localhost:3000/documentation) to see all available endpoints and their required parameters

You can connect to the mongodb instance within a GUI for mongo with connection string 'mongodb://localhost:27017'

## Standard User Story:

I've added comments within the code base for any other shortcomings in the system design that would be detrimental in a production grade repo.
