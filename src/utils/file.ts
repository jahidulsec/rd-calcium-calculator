import fs from "fs";

export const deleteFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) return;
  fs.unlinkSync(filePath);
};
