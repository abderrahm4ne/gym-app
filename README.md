# gym-system-management

A full desktop application built to manage gym memberships, payments, and member profiles — complete with image uploads and a modern user interface.
Built using Electron, React, MongoDB, and Cloudinary.

# Tech Stack
React.js + React Router Modern UI with smooth navigation and responsive pages

Electron IPC Handlers Handles database operations and communication between frontend and backend

MongoDB Stores members, subscriptions, and payment records

Cloudinary Manages and stores member profile images securely

Electron Wraps the web app into a native Windows desktop application

Windows 10 & 11 Fully compatible (Windows 7 soon)


# How To run

You can see .env.example and env needed insert your vars in .env (you create) and use it

## build the html file in dist folder for the react app: 
```shell
cd gym-app
npm run build
```

## after the build we can run the electron app or build the app
```shell
cd ../
```

## to run on you machine 
```shell
npm run start
```

## to build the app
  ### the app build matches your os, you just run :
  ```shell
      npm run make
 ```

## to use app 

### open out/make you'll find the exe file for ( linux / windows )

