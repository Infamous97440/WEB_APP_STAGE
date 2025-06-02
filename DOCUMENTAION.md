DEPENDENCIES:
pour le backend:
npm install postgres, graphql, express, express-graphql, dotenv

j'ais choisi d'utiliser graphql pour l'api car très performant du fait qu'il reduit le nombre d'appelle de fetch du fait qu'avec une requête on peut recupérer des donnée impriquer le front peut demander exactement ce qu'il veut avec.


pour le front:
npm create vite@latest src/frontend/ -- --template react
npm install @apollo/server @apollo/client graphql
npm install rechart.js "librairie open source bien documenter et facile a interer pour faire de beau graphique et responsive"
npm install cors pour pouvoir envoyer les donné graphql au front

react car très pratique bien documenter beaucoup de tuto et beaucoup de fonctionnalité
apollo client server du fait qu'il s'agit d'un client graphql et que le back est en graphql et très compatible avec react