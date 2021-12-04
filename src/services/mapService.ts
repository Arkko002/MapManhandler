import { readdirSync, renameSync, writeFileSync } from "fs";
import { MapList } from "../models/mapList";

export const getNewMaps = (
  mapUploadPath: string,
  exisitngMapsList: string[]
): string[] => {
  const uploadedFiles: string[] = readdirSync(mapUploadPath, "utf-8");

  return uploadedFiles.filter((map) => !exisitngMapsList.includes(map));
};

export const optimiseMapList = (mapList: MapList): void => {
  mapList.mapList = Array.from(new Set(mapList.mapList))
    .sort()
    .filter((x) => x);
};

export const moveMapFiles = (
  oldFilePath: string,
  newFilePath: string
): void => {
  try {
    renameSync(oldFilePath, newFilePath);
  } catch (error) {
    throw new Error(`Error while moving map files: ${error}`);
  }
};

export const writeMapListToFile = (mapList: MapList): void => {
  try {
    const mapListString = mapList.mapList.join("\n");
    writeFileSync(mapList.mapFilePath, mapListString);
  } catch (error) {
    throw new Error(`Error while writing map name to lists: ${error}`);
  }
};
