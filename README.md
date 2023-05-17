# Music Player ChatGPT plugin experiment

## read more here: 
- [Music Player ChatGPT plugin](https://sebbie.pl/music-player-chatgpt-plugin/)

![Music Player](https://sebbie.pl/wp-content/uploads/2023/05/music_engineer.png)

## Setup
- const APP_PORT = process.env.APP_PORT || 3000;
- const APP_HOST = process.env.APP_HOST || 'localhost';
- const APP_PROTOCOL = process.env.APP_PROTOCOL || 'http://';
- const SONGS_LIMIT = 50; // limit returned list of songs (chatGPT plugin response limitations)

## Running the Server
- npm install
- node app.js
- The server will listen on port "APP_PORT if set or port 3000. You can connect to the server using any web browser.

## Current limitations:
- Currently works only on MacOS
- Only plays local content

## How to Set Up the Plugin with ChatGPT
To use the plugin with ChatGPT, follow the steps in the "Develop your own plugin" section of the ChatGPT API documentation".
You need to enter the plugin's URL to use it as a plugin (localhost:3000)
After you've set up the plugin, you can use it through ChatGPT. 

## How to use
- ask chatGPT for list of available songs, for example: "Get me list of songs"
- now you can ask fo more info: "Add year and Artists to this list (based on your knowledge)"
- or just play one of these songs: "Play a song from 80's" or "Play a song: Bohemian Rhapsody"



