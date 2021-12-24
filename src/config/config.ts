import convict from "convict";

const config = convict({
  path: {
    uploadFolder: {
      doc: "Folder that will be scaned for new files",
      format: String,
    },
    bspMoveFolder: {
      doc: ".bsp files will be moved here from upload folder",
      format: String,
    },
    bzipMoveFolder: {
      doc: ".bzip files will be moved here after compressinb .bsp file",
      format: String,
    },
    mapFile: {
      doc: "Path to the main map list file",
      format: String,
    },
    mapAdminFile: {
      doc: "Path to the admin map list file (optional)",
      format: String,
      nullable: true,
    },
    mapNominationFile: {
      doc: "Path to the map nomination list file (optional)",
      format: String,
      nullable: true,
    },
  },
});

config.loadFile("./config.json");

config.validate({ allowed: "strict" });

export default config;
