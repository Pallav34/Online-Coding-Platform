import Question from '../models/QuestionModels/Question.js';
import { spawn } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';

export const submitSolution = async (req, res) => {
    try {
        const { questionId, code } = req.body;

        if (!questionId || !code) {
            return res.status(400).json({ error: 'Question ID and code are required' });
        }

        const question = await Question.findById(questionId)
            .populate('testCases');

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        await runCode(question, code, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

async function runCode(question, code, res) {
    const testCases = question.testCases;
    let results = [];

    async function runSingleTestCase(testCase, index) {
        const { input, expectedOutput } = testCase;
        const inputFilePath = `input_${index}.txt`;

        await fsPromises.writeFile(inputFilePath, input.replace("\r", ""), "utf-8");
        await fsPromises.writeFile("dev/Main.java", code);

        const compileJavaCmd = 'javac dev/Main.java';
        const runJavaCmd = 'java -cp dev Main';

        return new Promise((resolve, reject) => {
            let compileProcess = spawn('bash', ['-c', compileJavaCmd], { stdio: ['pipe', 'pipe', 'pipe'] });

            let outputValue = "";
            
            compileProcess.stdout.on("data", (data) => {
                console.log(`Compile stdout: ${data}`);
            });

            compileProcess.stderr.on("data", (stderr) => {
                console.error(`Compile stderr: ${stderr}`);
            });

            compileProcess.on("close", (code) => {
                if (code === 0) {
                    let runProcess = spawn('bash', ['-c', runJavaCmd], { stdio: ['pipe', 'pipe', 'pipe'] });
                    
                    const inputStream = fs.createReadStream(inputFilePath);
                    inputStream.pipe(runProcess.stdin);

                    runProcess.stdout.on("data", (data) => {
                        console.log(`Run stdout: ${data}`);
                        outputValue += data.toString();
                    });

                    runProcess.stderr.on("data", (stderr) => {
                        console.error(`Run stderr: ${stderr}`);
                    });

                    runProcess.on("close", (code) => {
                        console.log(`Run process closed with code ${code}`);
                        console.log(`Output Value: ${outputValue}`);

                        const result = {
                            input,
                            expectedOutput,
                            outputValue,
                            success: expectedOutput.trim() === outputValue.trim(),
                        };
                        resolve(result);
                    });
                } else {
                    console.error("Compilation failed.");
                    reject(new Error("Compilation failed"));
                }
            });
        });
    }

    for (let i = 0; i < testCases.length; i++) {
        try {
            const result = await runSingleTestCase(testCases[i], i);
            results.push(result);
        } catch (error) {
            console.error(`Error running test case ${i}: ${error}`);
        }
    }

    let allPassed = results.every(result => result.success);

    if (allPassed) {
        res.status(200).json({
            message: "All Test Cases Passed",
            results,
            error: false,
            success: true,
        });
    } else {
        res.status(200).json({
            message: "Some Test Cases Failed",
            results,
            error: true,
            success: false,
        });
    }
}