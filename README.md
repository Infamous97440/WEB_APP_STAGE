# 💼 Facture App – React, GraphQL, PostgreSQL

## 🧠 Présentation

Ce projet est une application de gestion de factures construite en **React** avec **Vite**, une API en **GraphQL** via **Apollo Server**, et une base de données **PostgreSQL**.

L'objectif est de fournir une interface rapide et moderne permettant de visualiser des factures sous forme de graphiques dynamiques grâce à **Recharts**, avec une communication optimisée entre le front-end et le back-end via **GraphQL**.

---

## ⚙️ Choix technologiques

### 🗂️ Frontend

- **React + Vite** :
  - Choix motivé par la rapidité de développement de Vite et la richesse de l’écosystème React.
  - Beaucoup de documentation et une grande communauté.
  
- **Apollo Client** :
  - Librairie officielle pour consommer des API GraphQL côté client.
  - Très bien intégrée avec React.
  
- **Recharts** :
  - Librairie de graphiques open source facile à intégrer.
  - Réactive, bien documentée, parfaite pour visualiser des données comme les factures.

### 🛠️ Backend

- **Apollo Server (via Express)** :
  - Permet de construire un serveur GraphQL complet.
  - Intégré avec Express pour plus de flexibilité.
  
- **GraphQL** :
  - Permet de faire des requêtes précises et optimisées.
  - Idéal pour éviter les over-fetching/under-fetching.
  - Le front peut demander uniquement les données dont il a besoin, même des structures imbriquées, en une seule requête.

- **PostgreSQL** :
  - Base de données relationnelle robuste.
  - Très bien supportée avec Node.js via divers ORM ou query builders.

- **Dotenv** :
  - Utilisé pour la gestion des variables d'environnement (connexion à la DB, port, etc.).
  - Séparation propre des données sensibles.

---

## 📦 Dépendances

### Backend

```bash
npm install -y
npm install express express-graphql graphql dotenv pg cors
```

### Frontend
```
npm create vite@latest src/frontend/ -- --template react
cd src/frontend/
npm install @apollo/client graphql recharts
```

## Lancer le projet

### Cloner le repo
```
git clone git@github.com:Infamous97440/WEB_APP_STAGE.git
cd WEB_APP_STAGE
```
### CONFIGURER LE .env à la racine du repo avec ses informations:
```
PGHOST=localhost
PGUSER=ton_utilisateur
PGPASSWORD=ton_mot_de_passe
PGDATABASE=nom_de_ta_db
PGPORT=5432
PORT=3000
```
### Lancer le backend
```
node src/index.js
```
l'api demarrera sur l'adresse http://localhost:3000/graphql par defaut

Vous pourrez y faire des requête graphql pour recupérer des valeur et les visualiser

exemple de requête graphql:
```
query TEST($id: ID!) {
    getBillLineById(id: $id) {
             id
             bill_id {
               bill_id
               created_at
               updated_at
               fishing_paper
               delivery_address
             }
             lot_number
             fish_id {
               fish_id
               name
             }
             fish_status
             quantity
             unit_price
             total_price
             total_epv
             code_fao
             name
             presentation
             coef_epv
             fresh_grade
             created_at
             updated_at
    }
}
```
et dans Query Variables qui se trouve en bas de la page mettez par exemple;
```
{"id": 1}
```
cliquez sur le premier bouton à droite du titre GraphiQL et dans l'inspecteur tout à droite vous verrez les donné sous format JSON

### Lancer le frontend
```
cd src/frontend
npm run dev
```
l'application react demarrera sur l'adresse http://localhost:5173
