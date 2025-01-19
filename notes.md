Dans le code suivant :  
```javascript
io.on('connection', (socket) => {
  console.log('Un utilisateur s’est connecté.');
});
```

### **`socket` : Qu'est-ce que c'est ?**

Le paramètre `socket` représente **l'instance individuelle de la connexion** entre le serveur et un client spécifique.

---

### **Rôles et significations de `socket`**
1. **Représente un client connecté :**
   - Chaque fois qu'un client se connecte au serveur, un nouvel objet `socket` est créé.
   - Cet objet permet au serveur de communiquer uniquement avec ce client.

2. **Identifie la connexion en cours :**
   - Chaque `socket` a un identifiant unique accessible via `socket.id`.  
     Exemple :
     ```javascript
     console.log(`Utilisateur connecté avec l'ID : ${socket.id}`);
     ```

3. **Permet la communication :**
   - Vous pouvez utiliser `socket` pour **écouter des événements** envoyés par ce client spécifique ou **émettre des événements** uniquement à ce client.  
     Exemple :
     ```javascript
     socket.on('message', (data) => {
       console.log(`Message du client ${socket.id} : ${data}`);
     });

     socket.emit('response', 'Message bien reçu !');
     ```

4. **Gère les déconnexions :**
   - L'objet `socket` est automatiquement détruit lorsque le client se déconnecte.
   - Vous pouvez écouter l'événement `disconnect` :
     ```javascript
     socket.on('disconnect', () => {
       console.log(`Client ${socket.id} s’est déconnecté.`);
     });
     ```

---

### **Propriétés et méthodes utiles de `socket`**

#### **Propriétés**
- **`socket.id` :** Identifiant unique de la connexion.
- **`socket.handshake` :** Données de la requête initiale, comme les cookies ou les headers.
  Exemple :
  ```javascript
  console.log(socket.handshake.headers);
  ```

#### **Méthodes**
1. **`socket.emit(event, data)` :**
   - Permet d'envoyer un événement au client spécifique.
   - Exemple :
     ```javascript
     socket.emit('welcome', 'Bienvenue sur le serveur !');
     ```

2. **`socket.on(event, callback)` :**
   - Permet d'écouter un événement envoyé par le client.
   - Exemple :
     ```javascript
     socket.on('message', (data) => {
       console.log(`Message reçu : ${data}`);
     });
     ```

3. **`socket.join(room)` et `socket.leave(room)` :**
   - Permet au client de rejoindre ou de quitter une "room" (salle de discussion).  
     Exemple :
     ```javascript
     socket.join('room1');
     io.to('room1').emit('message', 'Nouveau message dans la room1');
     ```

4. **`socket.disconnect()` :**
   - Permet de déconnecter un client manuellement.

---

### **Résumé :**
- **`socket`** est un objet représentant une connexion unique entre le serveur et un client spécifique.
- Il sert à gérer la communication individuelle avec ce client : écouter ses événements, lui envoyer des messages, et gérer sa déconnexion.  
C'est un élément clé pour créer des applications en temps réel personnalisées. 😊