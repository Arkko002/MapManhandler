import { pack } from "7zip-min";

export const compressMapFile = async (mapFilePath: string): Promise<string> => {
  const archivePath = mapFilePath.split(".")[0] + ".bzip2";

  pack(mapFilePath, archivePath, (err) => {
    if (err) {
      throw new Error(`Problem during compressing map file: ${err}`);
    }

    return archivePath;
  });
};
