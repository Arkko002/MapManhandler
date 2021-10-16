import { promisify } from "util";
import { readFile, rename } from "fs";
import { Config } from "../models/config";

const readFilePromise = promisify(readFile);
const renamePromise = promisify(rename);

export const loadConfig = async (): Promise<Config> => {
  let configFile: string;
  try {
    configFile = await readFilePromise("../config.json", "utf-8");
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

export const loadMapList = async (mapListPath: string): Promise<string[]> => {
  try {
    const fileContent = await readFilePromise(mapListPath, "utf-8");
    return fileContent.split("\n");
  } catch (error) {
    throw new Error(`Couldn't load a map list file: ${error}`);
  }
};

export const backupMapFile = async (mapFilePath: string): Promise<string> => {
  try {
    const now = Date.now();
    const newPath = `${mapFilePath}-bk-${now}`;
    await renamePromise(mapFilePath, newPath);
    return newPath;
  } catch (error) {
    throw new Error(`Couldn't backup a map file (${mapFilePath}) - ${error}`);
  }
};
