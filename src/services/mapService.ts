import { promisify } from "util";
import { readdir, rename, writeFile } from "fs";

const readdirPromise = promisify(readdir);
const renamePromise = promisify(rename);
const writeFilePromise = promisify(writeFile);

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

export const writeMapListToFile = async (
  mapList: string[],
  mapListPath: string
): Promise<void> => {
  try {
    const mapListString = mapList.join("\n");
    await writeFilePromise(mapListPath, mapListString);
  } catch (error) {
    throw new Error(`Error while writing map name to lists: ${error}`);
  }
};
