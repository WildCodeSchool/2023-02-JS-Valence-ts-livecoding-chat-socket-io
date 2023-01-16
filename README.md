## Workshop Socket.io

Le but de ce workshop est de vous présentez comment utiliser la librairie [socket.io](https://socket.io/) afin de réaliser un chat en temps réel style messenger/WhatsApp.

Il sera en plusieurs étapes :

## Par le formateur en live coding

### 1: Initialisation de socket.io coté backend

### 2: Initialisation de socket.io coté frontend

### 3: Lien socket.io entre front-end et back-end

### 4: Démonstration de l'envoie des premiers messages entre utilisateurs

## Exercice à faire en mode workshop

### 5: Affichage de la liste des utilisateurs actuellement connecté au chat

### 6: Actualisation de la liste lorsqu'un utilisateur se déconnecte et envoie d'un message dans le chat

### 7: Afficher un message de Bienvenue lorsqu'un utilisateur se connecte

### 8: Afficher un message aux autres utilisateurs lorsqu'un nouvel utilisateur se connecte (lien avec étape 8)

### 9: BONUS : Envoyer un message en appuyant sur la touche "Entré" du clavier et faire en sorte que lorsque on arrive à beaucoup de message, le viewport autoscroll vers le dernier message

### 10: BONUS DE LA MORT : implémenter la fonctionnalité "userName est en train d'écrire" qui s'affiche UNIQUEMENT si l'utilisateur est en train d'écrire

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm run setup`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Etape 5

Puisque je peux avoir plusieurs utilisateurs connectés en même temps sur le chat, je vais utiliser
un tableau d'user.

Je vais gérer ça coté backend et le renvoyer au front.

Ainsi la logique sera qu'une fois qu'un utilisateur se connecte on l'ajoute au tableau d'utilisateur
existant et on renvoie l'information coté front.

NE REGARDEZ PAS LE CODE SI VOUS VOULEZ LE FAIRE TOUT SEUL

<details>
<summary> Solution </summary>
<br>

```js
// je stock mes users dans un tableau
let users = [];

// pour avoir la liste des utilisateurs connectés

socket.on("newUser", (data) => {
  users.push(data); // j'ajoute l'utilisateur à mon tableau avec les data reçues du front
  io.emit("newUserResponse", users);
});
```

</details>

### Etape 6

lorsqu'un utilisateur quitte le chat je dois faire du coup plusieurs choses liées à l'étape précédente.

- Retirer l'utilisateur connecté
- Renvoyer un message disant que cet utilisateur est parti !

Le workflow sera le suivant: quand un utilisateur j'ai accès à son socket.id et je sais que cet id est présent dans mon tableau d'user dans le back. Comment avec une seul méthode je peux récupérer cet utilisateur et en même temps l'enlever de mon tableau d'user ?

<details>
<summary> un indice </summary>
<br>

.filter bien sur !

</details>

suite du workflow, une fois avoir récupéré l'utilisateur je peux renvoyer à tout le monde coté front que cet utilisateur a été déconnecté avec un .emit pour tout le monde.
Attention je dois également renvoyer la liste d'utilisateur mis à jour avec le retrait de l'utilisateur déconnecté.

NE REGARDEZ PAS LE CODE SI VOUS VOULEZ LE FAIRE TOUT SEUL

<details>
<summary> Solution </summary>
<br>

BACKEND :

```js
socket.on("disconnect", () => {
  // je récupère les infos de l'utilisateur déconnecté avec .filter;
  const actualUser = users.filter((user) => user.socketID === socket.id);
  const userToBeDisconnected = actualUser[0];

  // j'update mon tableau d'utilisateur en enlevant mon utilisateur avec filter encore une fois.
  users = users.filter((user) => user.socketID !== socket.id);

  // je renvoi ma liste mis à jour d'utilisateur coté front
  io.emit("newUserResponse", users);

  // je renvoie coté front l'info comme quoi l'utilisateur a quitté le chat.
  // on note que je dis que l'utilisateur qui renvoie se message et le chat bot mais c'est
  // comme vous voulez
  if (userToBeDisconnected) {
    io.emit("messageResponse", {
      text: `${userToBeDisconnected.userName} a quitté le chat`,
      name: "Chat Robot",
    });
  }
});
```

FRONTEND : ChatPage.jsx

```js
const [messages, setMessages] = useState([]);

useEffect(() => {
  socket.on("messageResponse", (message) => {
    setMessages([...messages, message]);
  });
}, [socket, messages]); // réagit lorsque un user est connecté avec socket
// et lorsque message change pour que mon tableau de message dans mon state s'update.
```

FRONT-END : ChatBar.jsx

```js
const [users, setUsers] = useState([]);

useEffect(() => {
  socket.on("newUserResponse", (user) => setUsers(user));
}, [socket, users]); // réagit lorsque un user est connecté avec socket
// et lorsque user change pour que mon tableau d'user dans mon state s'update.
```

</details>

### Etape 7

Après avoir envoyer un message lorsque l'utilisateur se déconnecte il faut faire la même une fois connecté.

Je dois créer un événement coté front quand un utilisateur se connecte, appelons-le "join".
J'écouterai coté back cet événement et renverrait à l'utilisateur un message de bienvenue.

NE REGARDEZ PAS LE CODE SI VOUS VOULEZ LE FAIRE TOUT SEUL

<details>
<summary> Solution </summary>
<br>

BACKEND :

```js
// welcome message quand un utilisateur arrive
socket.on("join", (data) => {
  // renvoie un message à la personne qui vient de se connecter
  // je renvoie un message avec un text, un name, un id, le socketID de la personne et un boolean
  // ce boolean me servira coté front à différencier les messages auto de bienvenue ou autre
  // contrairement aux messages envoyés par un utilisateur en particulier.
  socket.emit("welcome", {
    text: `Bienvenue ${data.userName}`,
    name: "Chat Robot",
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
    welcome: true,
  });
});
```

FRONT : ChatPage.jsx

```js
const [messages, setMessages] = useState([]);

useEffect(() => {
  socket.on("welcome", (message) => {
    setMessages([...messages, message]);
  });
}, [socket, messages]); // réagit lorsque un user est connecté avec socket
// et lorsque message change pour que mon tableau de message dans mon state s'update.
```

</details>

### ETAPE 8

Lié à l'étape précédente, mais seulement il y a une petite astuce. En effet on veut envoyer un message aux utilisateur lorsqu'un nouvel utilisateur se connecte cependant l'utilisateur qui se connecte n'a pas besoin lui de recevoir ce message car il en reçoit déjà un de bienvenue !

Du coup si on cherche sur la doc on voit qu'il existe une méthode pour ça : [broadcast](https://socket.io/get-started/chat#broadcasting).

Emit pour renvoyer à tout le monde, broadcast pour tout le monde excepté celui qui envoi le message, exactement ce qu'on veut !

NE REGARDEZ PAS LE CODE SI VOUS VOULEZ LE FAIRE TOUT SEUL

<details>
<summary> Solution </summary>
<br>

BACKEND :

```js
// welcome message quand un utilisateur arrive
// welcome message quand un utilisateur arrive
socket.on("join", (data) => {
  // CODE DE L'ETAPE PRECENDANTE

  // renvoie un message aux autres utilisateurs comme quoi un nouvel utilisateur a rejoint le chat
  // avec broadcast on note qu'on utilise quand meme emit mais avant on dit bien qu'on envoie pas à
  // l'utilisateur qui envoie le message mais seulement aux autres.
  // io.emit = TOUT LE MONDE
  // socker.broadcast.emit = TOUT LE MONDE SAUF LA PERSONNE QUI EMET LE MESSAGE
  socket.broadcast.emit("welcome", {
    text: `${data.userName} a rejoint le chat`,
    name: "Chat Robot",
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
    welcome: true,
  });
});
```

</details>

### ETAPE 9

Tout se passe coté front, en plus d'utiliser le bouton send faire en sorte que comme dans tout chat qui se respecte je peux appuyer sur la touche Entré et le message s'envoie.

<details>
<summary> Indice </summary>
<br>

lorsque'un utilisateur intéragit avec un input on obtient un événement qu'on récupère généralement dans
un const onChange = (event) => {};

Et bien je vous propose d'aller chercher du coté de event.key, soit en faisant du console.log soit en allant sur la doc : [event key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).

Pour ce qui est de l'autoScroll lorsqu'on a beaucoup de message regardez par [ici](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) avec un certain [useRef](https://beta.reactjs.org/reference/react/useRef)

Pour le reste c'est un BONUS, BON CHANCE.

</details>

### ETAPE 10

De prime abord, on se dit que ça peut être facile car en fait tant que l'utilisateur tape sur le clavier
je peux mettre un state et utiliser socket.io pour renvoyer aux autres avec broadcast. Mais comment gérer
ces personnes qui commencent à taper vont faire autre chose et envoie le message super longtemps après.
J'ai pas envie d'avoir DavidDu33 est en train d'écrire indéfiniment! Donc comment implémenter ça ?

<details>
<summary> Indice </summary>
<br>

BONUS DE LA MORT, donc c'est mort pas d'indice. SORRY BRO.

</details>
