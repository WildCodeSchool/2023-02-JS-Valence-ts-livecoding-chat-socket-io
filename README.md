## Workshop Socket.io

Le but de ce workshop est de vous présentez comment utiliser la librairie [socket.io](https://socket.io/) afin de réaliser un chat en temps réel style messenger/WhatsApp.

Il sera en plusieurs étapes :

## Par le formateur en live coding :

### 1: Initialisation de socket.io coté backend

### 2: Initialisation de socket.io coté frontend

### 3: Lien socket.io entre front-end et back-end

### 4: Démonstration de l'envoie des premiers messages entre utilisateurs

## Exercice à faire en mode workshop : 

### 5: Affichage de la liste des utilisateurs actuellement connecté au chat.

### 6: Actualisation de la liste lorsqu'un utilisateur se déconnecte et envoie d'un message dans le chat

### 7: Afficher un message de Bienvenue lorsqu'un utilisateur se connecte

### 8: Afficher un message aux autres utilisateurs lorsqu'un nouvel utilisateur se connecte (lien avec étape 8)

### 9: BONUS : Envoyer un message en appuyant sur la touche "Entré" du clavier et faire en sorte que lorsque on arrive à beaucoup de message, le viewport autoscroll vers le dernier message.

### 10: BONUS DE LA MORT : implémenter la fonctionnalité "userName est en train d'écrire" qui s'affiche UNIQUEMENT si l'utilisateur est en train d'écrire

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm run setup`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `setup` : Initialization of frontend and backend, as well as all toolings
- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated
