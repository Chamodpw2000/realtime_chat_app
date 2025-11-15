import express from "express";
import http from "http";
import { Server} from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "*",

    }
})

io.on("connection",(socket) => {
    console.log("a user connected: " + socket.id);
    
    // Get current user count and broadcast to all clients
    const userCount = io.sockets.sockets.size;
    console.log(`Total connected users: ${userCount}`);
    io.emit("user_count_update", userCount);

    socket.on("client_ready", (data)=>{
        console.log("Received from client: " + data);
    })

    socket.on("button_clicked",(data, callback) =>{

        console.log("Button clicked data:", data);
        if(callback){
            callback(`Server received the button click! ${data}`);
        }

        io.emit("do_smt", "Hello from server after button click !", ()=> {
            console.log("Acknowledgement received from client after do_smt");
        });
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        
        // Get updated user count and broadcast to remaining clients
        const userCount = io.sockets.sockets.size;
        console.log(`Total connected users: ${userCount}`);
        io.emit("user_count_update", userCount);
    });
})



server.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});





