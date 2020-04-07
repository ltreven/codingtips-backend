## Backend for Codingtips Project

### Requirements

Codingtips backend service exposes the API for Coding tips frontends.
It needs the following applications to be executed:

```
npm
node
docker
```

Follow the steps below to execute the backend.

### Install dependencies

```
npm install
docker pull mongo
```

### Create MongoDB instance on your localhost

```
docker run --name codingtips-db -p 27017:27017 -d mongo
```

### Execute the backend on your localhost on port 3000

```
npm start
```

### Test via Postman

```
https://documenter.getpostman.com/view/2306941/SzYdTwrN?version=latest
```

