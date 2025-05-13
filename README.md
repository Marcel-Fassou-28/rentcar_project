# RentCar WITH React + Tailwindcss + Laravel

Ce projet a été réalisé dans le cadre de notre module de Développement Web.
Il s'agit de Développer une plateforme web intuitive et sécurisée permettant aux clients de rechercher, 
réserver et gérer des locations de véhicules en ligne. L'application doit également offrir aux administrateurs un système efficace de gestion des véhicules, des réservations et des utilisateurs sans oublier des interfaces pour visualiser les statistiques de réservation, de paiement,etc...

*L’architecture est basée sur le modèle MVC (Modèle-Vue-Contrôleur)*, 
favorisant la séparation des responsabilités et la maintenabilité du code :

**Modèle** : représente les données et les règles métiers (Laravel + MySQL)
**Vue** : interface utilisateur (React.js)
**Contrôleur** : logique de traitement et gestion des requêtes (Laravel API)

---

# 🧩 Fonctionnalités principales
L'Application web dispose d'un système d'authentification robuste qui se base 
selon les roles qui sont administrateur et client

## 👤 Côté client :
Rechercher un véhicule (par type, prix, disponibilité, etc...)

+ Consulter les détails du véhicule
+ Réserver un véhicule
+ Créer un compte et se connecter
+ Gérer ses réservations (modifier, annuler)
+ Effectuer un paiement sécurisé

## 🛠️ Côté administrateur :
Gérer les véhicules (ajout, modification, suppression)

+ Valider ou annuler les réservations (optionnelle)
+ Gérer les utilisateurs
+ Consulter les historiques de réservation et statistiques
+ Gérer les véhicules (selon le modèle CRUD -- ***Create Read Update Delete ***)

---

# Technologies Utilisées

+ **Front-end** : ReactJS + Tailwindcss - Interface utilisateur dynamique et réactive
+ **Back-end** : Laravel (API Restful) - Gestion de la logique métier et des requêtes
+ **Base de données** : MySQL - Stockage des données relationnelles
+ **Conception** : UML - Modélisation des diagrammes de cas d'utilisation et classes ainsi que le Modèle Conceptuelle de la base de données

# Lancer le projet
