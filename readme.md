## Installation

Source files are in src/ folder, you can build them by running this in main folder (where package.json is):
```
npm i

npm run build
```
that will output builded files to dist/ folder

## Running 

Builded files can be run with "node index.js" run directly in dist/ folder

## Config

Config currently is a shoddly placed .json file in dist/config
All of the configs are paths to folders or files described in the config's name

Upload folder, file move paths and mapFile path are required

MapAdminFile and MapNominationFile are optional, but still need to be in config.json.
You can leave them as empty "" if you dont want them set, but dont delete the entries from the file.
