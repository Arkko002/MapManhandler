import { pack } from "7zip-min";
import { promisify } from "util";

const packPromise = promisify(pack);

export const compressMapFile = async (mapFilePath: string): Promise<string> => {
  try {
    const archivePath = mapFilePath + ".bzip2";
    await packPromise(mapFilePath, archivePath);

    return archivePath;
  } catch (error) {
    throw new Error(`Problem during compressing map file: ${error}`);
  }
};
