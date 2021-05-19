# Inge Bra Bygg App

## Installation

```
# Install all dependencies for the project
npm install
```

## Setup / Configuration

Create an .env file with the following content

```
PORT=3000
JWT_SECRET=supersecretpassword 
ADMIN1=supersecretpassword
ADMIN2=supersecretpassword
WORKER1=supersecretpassword
WORKER2=supersecretpassword
CLIENT1=supersecretpassword
CLIENT2=supersecretpassword

```

Remember to change the supersecretpassword to your own password.

```
#Create a database and add users to Users table
node database/setup.js && node database/seed.js
```

## Run server

```
npm start 
```
