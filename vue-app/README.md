# Vue Dragon Curve

This folder contains a small Vue application that displays the Dragon Curve. Use the slider at the bottom to set the curve evolution from 0 to 100 and press **Play** to animate it, one percent per second.

## Serving the page with Node on Windows

1. Install [Node.js](https://nodejs.org/) if not already installed.
2. From a command prompt inside this directory, install the dependencies:
   ```
   npm install express
   ```
3. Start the server:
   ```
   node server.js
   ```
4. Open `http://localhost:3000` in your browser.

The `server.js` script uses Express to serve the static files located in this folder.
