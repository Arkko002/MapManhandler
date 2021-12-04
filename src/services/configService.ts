import { copyFileSync, readFileSync } from "fs";
import { Config } from "../models/config";
import { MapList } from "../models/mapList";

export const loadConfig = (): Config => {
  let configFile: string;
  try {
    configFile = readFileSync(
      "/home/arkko/Projects/mapManhandler.ts/src/config.json",
      "utf-8"
    );
  } catch (error) {
    throw new Error(`Could not read the config file from usual path: ${error}`);
  }

  let configObj: Config;
  try {
    configObj = JSON.parse(configFile);
  } catch (error) {
    throw new Error(
      `Could not parse config file contents into JSON, check the formatting or missing entries: ${error}`
    );
  }

  return configObj;
};

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
