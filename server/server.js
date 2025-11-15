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



socket.on("send_message", (data) => {
    console.log("Message received: ", data);
    socket.broadcast.emit("message_received", data);


});

socket.on("user_joined", (data) => {
    console.log("User signed up: ", data);
    socket.broadcast.emit("new_user_signed_up", data, ()=>{
        console.log("New user signup broadcasted");
    });
});
    
    



    
  

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
})



server.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});





