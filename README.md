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
``js
  // je stock mes users dans un tableau
  let users = [];

    // pour avoir la liste des utilisateurs connectés

socket.on("newUser", (data) => {
users.push(data); // j'ajoute l'utilisateur à mon tableau avec les data reçues du front
io.emit("newUserResponse", users);
});
``

</details>
