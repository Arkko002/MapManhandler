import { copyFileSync, readFileSync } from "fs";
import { MapList } from "../models/mapList";

const loadMapList = (mapListPath: string): string[] => {
  try {
    const fileContent = readFileSync(mapListPath, "utf-8");
    return fileContent.split("\n");
  } catch (error) {
    throw new Error(`Couldn't load a map list file: ${error}`);
  }
};

export const getMapList = (
  mapListArray: MapList[],
  mapListPath: string
): void => {
  if (mapListPath) {
    mapListArray.push({
      mapList: loadMapList(mapListPath),
      mapFilePath: mapListPath,
    });
  }
};

export const backupMapFile = (mapList: MapList): string => {
  try {
    const now = Date.now();
    const newPath = `${mapList.mapFilePath}-bk-${now}`;
    copyFileSync(mapList.mapFilePath, newPath);
    return newPath;
  } catch (error) {
    throw new Error(
      `Couldn't backup a map file (${mapList.mapFilePath}) - ${error}`
    );
  }
};
