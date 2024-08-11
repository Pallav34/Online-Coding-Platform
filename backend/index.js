import express from "express";
import { spawn } from "child_process";
import { codeRunner } from "./service/codeRun.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import dbConnect from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"
import contestRoutes from "./routes/contestRoutes.js"
import leaderboardRoutes from "./routes/leaderboardRoutes.js"


const app = express();
const server = http.createServer(app);
const io = new Server(server);


dbConnect();
app.use(cors());
app.use(express.json());
app.use('/api', questionRoutes);
app.use('/api',submissionRoutes);
app.use('/api/contest',contestRoutes);
app.use('/api/leaderboards', leaderboardRoutes);

let shellProcess;

io.on("connection", (socket) => {
    console.log("Client connected");

    shellProcess = spawn('bash', ['-i'], {
        stdio: ['pipe', 'pipe', 'pipe'],
    });

    shellProcess.stdout.on("data", (data) => {
        console.log("Shell Output:", data.toString());
        socket.emit("output-success", data.toString());
    });

    shellProcess.stderr.on("data", (data) => {
        console.log("Shell Error:", data.toString());
        socket.emit("output-error", data.toString()); 
    });
    socket.on("input", (data) => {
            shellProcess.stdin.write(data + "\n");
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
            if(shellProcess){
                shellProcess.kill();
            shellProcess = null;
            }
        
    });
    

    
});
export {shellProcess};
    

app.post("/run", (req, res) => {
    try {
        const code = req.body.code;

        

        let executed = codeRunner(code, shellProcess);
        if (executed) {
            res.status(200).send({
                message: "Code Running...",
            });

        } else {
            res.status(400).send({
                message: "Invalid Code",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong!" });
    }
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});
