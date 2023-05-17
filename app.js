const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');



const app = express();
app.use(cors());
app.use(bodyParser.json());

const APP_PORT = process.env.APP_PORT || 3000;
const APP_HOST = process.env.APP_HOST || 'localhost';
const APP_PROTOCOL = process.env.APP_PROTOCOL || 'http://';
const SONGS_LIMIT = 50;

let todos = {};

app.get("/music/list", (req, res) => {
  exec(`osascript -e 'on run args' -e 'tell application "Music" to get name of every track' -e 'end' "$*" | tr "," "\n" | sort | awk '!seen[$0]++' | awk 'BEGIN {srand()} {print rand() "\t" $0}' | sort -n | cut -f2- | head -n ${SONGS_LIMIT}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('error');
    }
    res.status(200).send(stdout);
  });    
});

app.get("/music/play/:songTitle", (req, res) => {
    const { songTitle } = req.params;
    console.log('play: ' + songTitle);
    exec(`sh play-music.sh "${songTitle}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('error');
      }
      res.status(200).send('OK');
    });
});

app.get("/logo.png", (req, res) => {
    res.sendFile(path.join(__dirname, 'logo.png'));
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
    console.log('manifest');
    let host = req.headers.host;
    fs.readFile("manifest.json", 'utf8', function(err, data){
        if (err) throw err;
        data = data.replace(/PLUGIN_HOSTNAME/g, `${APP_PROTOCOL}${APP_HOST}:${APP_PORT}`)
        res.send(data);
    });
});

app.get("/openapi.yaml", (req, res) => {
    let host = req.headers.host;
    fs.readFile("openapi.yaml", 'utf8', function(err, data){
        if (err) throw err;
        data = data.replace(/PLUGIN_HOSTNAME/g, `${APP_PROTOCOL}${APP_HOST}:${APP_PORT}`);
        res.send(data);
    });
});

app.listen(APP_PORT, '0.0.0.0', () => {
    console.log('Music Player Server is running on port ' + APP_PORT);
});
