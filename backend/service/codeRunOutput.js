import { writeToFile } from "./fileOverride.js";
import { runJavaCodeCmd } from "../scripts.js";
import {shellProcess} from "../index.js";

export const codeRunOutput = (code) => {
    return new Promise((resolve, reject) => {
        if (!shellProcess) {
            return reject(new Error('Shell process is not initialized'));
        }

        // Write the Java code to a file
        writeToFile("dev/Main.java", code);
        
        // Run the command to compile and execute the code
        shellProcess.stdin.write(runJavaCodeCmd + "\n");

        // Capture output and errors
        let output = '';
        let errorOutput = '';

        shellProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        shellProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        shellProcess.on('close', (code) => {
            if (code === 0) {
                console.log(output);
                resolve(output.trim());
            } else {
                reject(new Error(`Execution failed with code ${code}: ${errorOutput}`));
            }
        });

        // Handle potential errors
        shellProcess.on('error', (error) => {
            reject(new Error(`Shell process error: ${error.message}`));
        });
    });
};
