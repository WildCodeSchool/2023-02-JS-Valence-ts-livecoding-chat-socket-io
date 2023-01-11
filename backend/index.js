require("dotenv").config();
const socketIo = require("socket.io");
const http = require("http");

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "3000", 10);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
  },
});

let users = [];

io.on("connection", (socket) => {
  // reception de message
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  // welcome message quand un utilisateur arrive
  socket.on("join", (data) => {
    // renvoie un message à la personne qui vient de se connecter
    socket.emit("welcome", {
      text: `Bienvenue ${data.userName}`,
      name: "Chat Robot",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      welcome: true,
    });

    // renvoie un message aux autres utilisateurs comme quoi un nouvel utilisateur a rejoint le chat
    socket.broadcast.emit("welcome", {
      text: `${data.userName} a rejoint le chat`,
      name: "Chat Robot",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      welcome: true,
    });
  });

  // gestion du "userName is typing"
  socket.on("typing", (data) => {
    if (data.typing) {
      socket.broadcast.emit("isTyping", `${data.userName} is typing`);
    } else {
      socket.broadcast.emit("isTyping", "");
    }
  });

  // pour avoir la liste des utilisateurs connectés
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  // suppression de l'utilisateur quand il se déco
  socket.on("disconnect", () => {
    const actualUser = users.filter((user) => user.socketID === socket.id);
    const userToBeDisconnected = actualUser[0];
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    if (userToBeDisconnected) {
      io.emit("messageResponse", {
        text: `${userToBeDisconnected.userName} a quitté le chat`,
        name: "Chat Robot",
      });
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
