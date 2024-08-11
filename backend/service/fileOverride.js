import fs from 'fs/promises';

export const writeToFile = async (location, code) => {
  try {
    console.log(code);
    await fs.writeFile(location, code);
    console.log("File Write Success");
  } catch (err) {
    console.error("Error writing file:", err);
  }
};
