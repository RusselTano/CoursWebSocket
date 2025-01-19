const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// initialisation de l'application Express et du serveur HTTP
const app = express();
const server = http.createServer(app);

//initialisation de Socket.IO
const io = new Server(server, { cors: { origin: "*" } });

// ROute par defaut pour verieir que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Serveur socket.io fonctionne !");
});

// Etat du serveur : Stocker les utilisateurs et leurs rooms
const users = {};

// Gerer les connexions Socket.IO
//socket est un objet represente une connection unique entre le serveur et ce client specifique
// on egalement un id avec socket.id, une nouvel instance de cet objet est creer a chaque fois qu'un user ce connect
io.on("connection", (socket) => {
  console.log(`L'utilisateur ${socket.id}, s'est connecte ✅`);

  //Auand un utilisateur rejoint une room
  socket.on("joinRoom",({username, room}) => {
    // Enregistrer l'utilisateur
    users[socket.id] = {username, room};
    socket.join(room) // ajouter l'utilisateur a la room

    // notification aux autres utilisateurs de la room
    socket.to(room).emit("notification", `${username} a rejoint la room ${room}`)
    console.log(`${username} a rejoint la room ${room}`);
  })

  // recuperer le message
  socket.on("message", (message) => {
    const user = users[socket.id];
    if(user && user.room){

      // Envoyer le message uniquement a la room
      io.to(user.room).emit("message", {username: user.username, message})
    }
  });

  // Gerer la deconnexion
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if(user){
      const {username, room} = user;

      // Supprimer l'utilisateur de la liste
      delete users[socket.id];

      // notifier les autres utilisateurs de la room 
      socket.to(room).emit("notification", `${username} a quitte la room.`);
      console.log(`${username} a quitte la room ${room}.`)
    }
    console.log(`L'utilisateur ${socket.id}, s'est deconnecte ❌.`);
  });
});

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`);
});
