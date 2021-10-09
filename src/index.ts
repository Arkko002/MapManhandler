import { Config } from "./models/config";
import { compressMapFile } from "./services/compressService";
import { loadConfig, loadMapList } from "./services/configService";
import {
  appendMapNameToLists,
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
  for (const map of newMaps) {
    const bzipFilePath: string = await compressMapFile(map);

    await moveMapFiles(
      map,
      bzipFilePath,
      config.bspMovePath,
      config.bzipMovePath
    );

    await appendMapNameToLists(
      map,
      config.mapListPath,
      config.mapAdminListPath,
      config.mapNominationsListPath
    );
  }
};
