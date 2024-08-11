import { writeToFile } from "./fileOverride.js";
import { runJavaCodeCmd } from "../scripts.js";

export const codeRunner = (code, shellProcess) => {
    try {
        writeToFile("dev/Main.java", code);
        shellProcess.stdin.write(runJavaCodeCmd + "\n");
        return true;
    } catch (error) {
        console.error("Error running code:", error);
        return false;
    }
};
