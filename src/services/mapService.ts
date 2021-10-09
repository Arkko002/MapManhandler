import { promisify } from "util";
import { readdir, rename, appendFile } from "fs";

const readdirPromise = promisify(readdir);
const renamePromise = promisify(rename);
const appendFilePromise = promisify(appendFile);

export const getNewMaps = async (
  mapUploadPath: string,
  exisitngMapsList: string[]
): Promise<string[]> => {
  const uploadedFiles: string[] = await readdirPromise(mapUploadPath, "utf-8");

  return uploadedFiles.filter((map) => !exisitngMapsList.includes(map));
};

export const moveMapFiles = async (
  bspFilePath: string,
  bzipFilePath: string,
  bspMovePath: string,
  bzipMovePath: string
): Promise<void> => {
  try {
    await renamePromise(bspFilePath, bspMovePath);
    await renamePromise(bzipFilePath, bzipMovePath);
  } catch (error) {
    throw new Error(`Error while moving map files: ${error}`);
  }
};

export const appendMapNameToLists = async (
  mapName: string,
  mapListPath: string,
  mapAdminListPath: string,
  mapNominationListPath: string
): Promise<void> => {
  try {
    await appendFilePromise(mapListPath, mapName, "utf-8");
    await appendFilePromise(mapAdminListPath, mapName, "utf-8");
    await appendFilePromise(mapNominationListPath, mapName, "utf-8");
  } catch (error) {
    throw new Error(`Error while appending map name to lists: ${error}`);
  }
};
