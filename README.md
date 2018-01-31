# anonymous-chat
Semi-anonymous chat server and web app programs.


## Installation

### Server
Installing the server is an easy 5 step process.

1. Download this repository
2. Run `cd server`
3. Run `npm install` or `yarn install` to install all necessary packages
4. Edit the `.env` file to contain your own SSL key and certificate
5. Run `npm start`

### Client
There is no need to install the client web app. Just visit the associated website [here](https://afro-anonchat.firebase.com), however there will be an Electron app coming out soon:tm:

#### What if I want to host myself?
If you want to host the chat app yourself, or use a custom version of it, just run `cd webapp && npm run build` to build the web app. The fully compiled files will be located in `/path/to/project/webapp/build/`
