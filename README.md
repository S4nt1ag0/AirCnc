<h1 align="center">
<br>
  <img src="./web/src/assets/logo.svg" alt="AirCnc" width="120">
<br>
<br>
</h1>

<p align="center">A project prepared by Rocketseat developed during the week OmniStack 9</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<div>
<--
  <img src="./assets/demo-web.gif" alt="demo-web" height="425">
  <img src="./assets/demo-mobile.gif" alt="demo-mobile" height="425">
--!>
</div>

<hr />

## Tech Stacks

- :atom_symbol: **[React Js](https://reactjs.org)** — A JavaScript library for building user interfaces
- :atom_symbol: **[React Native](https://reactnative.dev/)** — A lib that provides a way to create native apps for Android and iOS
- :arrows_counterclockwise: **[Typescript](https://www.typescriptlang.org/)** — A superset of JavaScript that adds typing and some other features to the language
- :toolbox: **[Expo](https://expo.io/)** — An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- :gear: **[Node Js](https://nodejs.org/en/)** — A multiplatform software, which executes JavaScript code on the backend and frontend / interface
- :closed_lock_with_key: **[MongoDB](https://docs.mongodb.com/)** — An multiplatform open source database oriented software
- :rocket: **[Socket IO](https://socket.io/)** — A library for realtime web applications

## Features

* Expo was used to create the native application.
<!-- * The Websocket connection was persisted in the database in order to make the server more stateless. -->

## Getting started

1. Clone this repo using `git clone https://github.com/S4nt1ag0/AirCnc.git`
2. Move yourself to the appropriate directory: `cd AirCnc`<br />
3. Run `yarn` to install dependencies<br />

### Getting started with the backend server

1. Move yourself to the backend folder: `cd server`
2. Create a `.env` file and add the MongoDB url connection in `MONGO_URI` field
3. Run `yarn dev` to start the server

### Getting started with the frontend app

1. Move yourself to the frontend folder: `cd web`
2. Create a `.env` file and add the url and the port where the API are running in `REACT_APP_API_URL` field
3. Run `yarn start` to start the web application

### Getting started with the mobile app

1. Move yourself to the mobile folder: `cd mobile`
2. Create a `.env` file and add the url and the port where the API are running in `REACT_APP_API_URL` field
3. Run `expo start` to start the mobile application and scanned the QR code with your smartphone or choose the option for run in your emulator

Note: if you are running yuor api in localhost, remember that the localhost address change for your smartphone or you emulator, in this case 
get the url that expo show when you run `expo start` and add the port of localhost where the server are running.

Note2: if you will use emulator remember start the emulator before choose initialize the mobile application in emulador when run 'expo start'

## License 

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
