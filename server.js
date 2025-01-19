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

// Gerer les connexions Socket.IO
//socket est un objet represente une connection unique entre le serveur et ce client specifique
// on egalement un id avec socket.id, une nouvel instance de cet objet est creer a chaque fois qu'un user ce connect
io.on("connection", (socket) => {
  console.log(`L'utilisateur ${socket.id}, s'est connecte ✅`);

  // Ecouter un evenement personnaliser
  socket.on("message", (data) => {
    console.log("Message recu : ", data);

    // Repondre a tous les client connectes
    io.emit("message", `Message diffuse : ${data}`);
  });

  // Gerer la deconnexion
  socket.on("disconnect", () => {
    console.log(`L'utilisateur ${socket.id}, s'est deconnecte ❌.`);
  });
});

// Lancer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`);
});
