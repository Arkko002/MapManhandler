import { Config, MapList } from "./models/config";
import { pack } from "7zip-min";
import {
  loadConfig,
  backupMapFile,
  getMapList,
} from "./services/configService";
import {
  writeMapListToFile,
  getNewMaps,
  moveMapFiles,
  optimiseMapList,
} from "./services/mapService";

export const main = (): void => {
  const config: Config = loadConfig();
  const mapLists: MapList[] = new MapList();

  getMapList(mapLists, config.mapListPath);
  getMapList(mapLists, config.mapAdminListPath);
  getMapList(mapLists, config.mapNominationsListPath);

  const newMaps: string[] = getNewMaps(
    config.bspUploadPath,
    mapLists[0].mapFilePath
  );
  if (!newMaps.length) {
    console.log("Found no new maps, exiting");
    return;
  }

  for (const map of mapLists) {
    backupMapFile(map);
  }

  for (const map of newMaps) {
    const fullBspPath = `${config.bspUploadPath}/${map}`;
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
