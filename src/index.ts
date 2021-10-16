import { Config } from "./models/config";
import { compressMapFile } from "./services/compressService";
import {
  loadConfig,
  loadMapList,
  backupMapFile,
} from "./services/configService";
import {
  writeMapListToFile,
  getNewMaps,
  moveMapFiles,
} from "./services/mapService";

export const main = async (): Promise<void> => {
  const config: Config = await loadConfig();

  const mapList: string[] = await loadMapList(config.mapListPath);
  const mapAdminList: string[] = await loadMapList(config.mapAdminListPath);
  const mapNominationList: string[] = await loadMapList(
    config.mapNominationsListPath
  );

  const newMaps: string[] = await getNewMaps(config.bspUploadPath, mapList);
  if (newMaps.length) {
    await backupMapFile(config.mapListPath);
    await backupMapFile(config.mapAdminListPath);
    await backupMapFile(config.mapNominationsListPath);
  }

  for (const map of newMaps) {
    const bzipFilePath: string = await compressMapFile(map);

    await moveMapFiles(
      map,
      bzipFilePath,
      config.bspMovePath,
      config.bzipMovePath
    );

    mapList.push(map);
    mapAdminList.push(map);
    mapNominationList.push(map);
  }

  const optimizedMapList = Array.from(new Set(mapList)).sort();
  const optimizedAdminList = Array.from(new Set(mapList)).sort();
  const optimizedNominationList = Array.from(new Set(mapList)).sort();

  await writeMapListToFile(optimizedMapList, config.mapListPath);
  await writeMapListToFile(optimizedAdminList, config.mapAdminListPath);
  await writeMapListToFile(
    optimizedNominationList,
    config.mapNominationsListPath
  );
};
