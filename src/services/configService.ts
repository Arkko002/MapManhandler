import { promisify } from "util";
import { readFile } from "fs";
import { Config } from "../models/config";

const readFilePromise = promisify(readFile);

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
  const fileContent = await readFilePromise(mapListPath, "utf-8");
  return fileContent.split("\n");
};
