# 🧪 Test Technique - Analyse de Données

Bienvenue dans le test technique.
Ce test a pour objectif d’évaluer votre capacité à manipuler des données, à extraire des informations pertinentes, et à concevoir une petite application web pour les restituer de manière claire.

---

## 🧠 Objectif

Vous recevrez un fichier `.sql` contenant la structure et les données d'une base de données.
Votre mission est de :

1. **Importer les données** dans votre base PostgreSQL locale.
2. **Développer un backend** pour interroger les données et effectuer des analyses statistiques.
3. **Créer un frontend** simple pour afficher les résultats de vos analyses.

---

## 🛠 Technologies attendues

Aucune stack imposée, mais voici les recommandations :

- **Backend** : Node.js, Python (Flask, FastAPI), etc.
- **Frontend** : React, Vue.js, ou tout autre framework SPA
- **Base de données** : PostgreSQL

---

## 📋 Instructions

1. Créez votre base de données PostgreSQL.
2. Importez les données grâce au script bash **`db.sh`** fourni.
3. Développez une API REST ou GraphQL permettant de récupérer les données pertinentes.
4. Effectuez des analyses **statistiques** sur les **factures**. Aucune restriction : si une donnée vous semble pertinente à mettre en valeur, faites-le.
5. Affichez vos résultats dans une interface web simple (graphiques, tableaux, etc.).
6. Documentez votre travail dans un fichier `README.md`.

---

## 📦 Livrables attendus

- Le code source complet (backend + frontend), dans un repository Git ou une archive `.zip`.
- Un `README.md` expliquant :
  - Comment lancer le projet localement
  - Les choix techniques effectués
  - Les analyses réalisées

---

## 🧾 Script

Pour exécuter le script de création des tables et d’insertion des données, vous devez d’abord avoir PostgreSQL installé.
Ensuite :

1. Créez une base de données (par exemple : `test_technique_aripa`)
2. Exécutez le script **`db.sh`** depuis le dossier `database`.
  Si le script ne fonctionne pas, ne paniquez pas.
  Retrouver ces commandes dans le script.
  ```bash
    psql -h localhost -U "$db_user" -d "$db_name" -f init.sql
  ```
  Et éxécuter les à la main dans cette ordre :
  ```bash
    psql -h localhost -U "$db_user" -d "$db_name" -f init.sql
    psql -h localhost -U "$db_user" -d "$db_name" -f insert_species.sql
    psql -h localhost -U "$db_user" -d "$db_name" -f insert_fish.sql
    psql -h localhost -U "$db_user" -d "$db_name" -f insert_entities_boats_bills.sql
  ```

---

## 📅 Date limite

Le rendu est attendu **au plus tard le mardi 2 juin 2025 à 12h00**.

Merci de respecter cette date afin que nous puissions évaluer toutes les candidatures équitablement.

---

## ❓ Questions

Pour toute question durant le test, vous pouvez me contacter à : **[manu.acamas-vaudemont@epitech.eu]**

---

Bonne chance ! 🚀
