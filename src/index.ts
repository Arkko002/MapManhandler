import config from "./config/config.json";
import { MapList } from "./models/mapList";
import { pack } from "7zip-min";
import { backupMapFile, getMapList } from "./services/configService";
import {
  writeMapListToFile,
  getNewMaps,
  moveMapFiles,
  optimiseMapList,
} from "./services/mapService";

export const main = (): void => {
  const mapLists: MapList[] = new Array<MapList>();

  const mapFile: string = config.mapFile;
  getMapList(mapLists, mapFile);

  if (config.mapAdminFile) {
    const mapAdminFile: string = config.mapAdminFile;
    getMapList(mapLists, mapAdminFile);
  }

  if (config.mapNominationsFile) {
    const mapNominationFile: string = config.mapNominationsFile;
    getMapList(mapLists, mapNominationFile);
  }

  const newMaps: string[] = getNewMaps(
    config.uploadFolder,
    mapLists[0].mapList
  );
  if (!newMaps.length) {
    console.log("Found no new maps, exiting");
    return;
  }

  for (const map of mapLists) {
    backupMapFile(map);
  }

  for (const map of newMaps) {
    const fullBspPath = `${config.uploadFolder}/${map}`;
    const fullBzipPath = fullBspPath.split(".")[0] + ".bzip2";

    pack(fullBspPath, fullBzipPath, (err) => {
      if (err) {
        throw new Error(`Problem during compressing map file: ${err}`);
      }

      const archiveFile = fullBzipPath.split("/");
      const lastIndex = archiveFile.length;

      const newBspPath = `${config.bspMovePath}/${map}`;
      const newBzipPath = `${config.bzipMovePath}/${
        archiveFile[lastIndex - 1]
      }`;

      moveMapFiles(fullBspPath, newBspPath);
      moveMapFiles(fullBzipPath, newBzipPath);

      mapLists.forEach((m: MapList) => {
        m.mapList.push(map);
        optimiseMapList(m);
        writeMapListToFile(m);
      });
    });
  }
};

main();
