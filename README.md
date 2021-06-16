# Inge Bra Bygg App

## Installation

```
npm install

```

## Setup / Configuration

#### 1. Create an .env file with the following content

```
PORT=3000
JWT_SECRET=supersecretpassword 
ADMIN1=supersecretpassword
ADMIN2=supersecretpassword
WORKER1=supersecretpassword
WORKER2=supersecretpassword
CLIENT1=supersecretpassword
CLIENT2=supersecretpassword

Remember to change the "supersecretpassword" to your own password.
```
#### 2. Create an "upload_images" folder for save images.

#### 3. Setup database and seed file.

```
node database/setup.js && node database/seed.js

```

## Run server

```
npm start 

```
