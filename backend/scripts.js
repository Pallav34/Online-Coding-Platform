
const devFolder = "./dev";

export const runJavaCodeCmd = `javac ${devFolder}/Main.java && java -cp ${devFolder} Main && rm ${devFolder}/Main.class;`;



// const getClassNameFromFile = () => {
//   const content = fs.readFileSync(`${devFolder}/Main.java`, 'utf8');
//   const classMatch = content.match(/public\s+class\s+(\w+)/);
//   if (classMatch) {
//     return classMatch[1];
//   } else {
//     throw new Error('No public class found in the file');
//   }
// };

// // Function to create a dynamic command
// // const createRunJavaCodeCmd = (javaFilePath, devFolder) => {
// //   const className = getClassNameFromFile(javaFilePath);
// //   return `javac ${javaFilePath} && java -cp ${devFolder} ${className} && rm ${path.join(devFolder, `${className}.class`)}`;
// // };
// export const runJavaCodeCmd = () =>{
//     const clasName = getClassNameFromFile();
//     console.log("Classname is" , clasName);
//     return `javac ${devFolder}/Main.java && java -cp ${devFolder} ${clasName} && rm ${path.join(devFolder, `${clasName}.class`)};`
// }