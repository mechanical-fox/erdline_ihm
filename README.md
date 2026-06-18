

# Projet   

Ce projet contient le code de la partie frontend / graphique, du site Erdline. Ce site a pour but de permettre la création de jeux de
type Visual Novel. Afin d'aider à pouvoir plus facilement tester une idée de Visual Novel, des sprites de base sont fournis, et il
est utilisé comme décors de simples dégradés de couleurs.

Les fonctionnalités actuelles sont les suivantes:
- Sauvegarde via le système de session
- Possibilité de créer des Visual Novels de type Kinetic
- Décors gérés sous formes de dégradés de couleurs
- Gestion des Sprites des personnages 
- Page Exemple
- Page A propos


# Tests unitaires   

Pour lancer les tests unitaires

```sh
npm run test
```

Pour lancer les tests unitaires, et vérifier le taux de couverture

```sh
npm run coverage
```

La seconde commande échouera en cas de taux de couverture des tests insuffisant. De plus,
la seconde commande génère un rapport html sur le taux de couverture dans le répertoire

**coverage/erdline-ihm**

# Exécution    

Installez tout d'abord les dépendances du projet avec

```sh
npm install
```

Vous pouvez ensuite démarrer le site internet avec

```sh
npm run serve
```

Vous pourrez alors vous connecter à l'url    

http://localhost:4200


# Profils / Environnements

Ce projet dispose de deux environnements, "development" et "production". Par défaut, exécuter
npm run serve utilisera l'environnement "development", et exécuter npm run build utilisera
l'environnement "production".

Les configurations utilisées sont décrites dans les fichiers suivants    
[src/environments/development.ts](./src/environments/development.ts)     
[src/environments/production.ts](./src/environments/production.ts)    


    
# Déploiement    


Un site internet se déploie en plaçant dans un répertoire spécifique d'un serveur web les 
fichiers html, css, et javascript, correspondant à notre site internet. L'on parle généralement
de répertoire dist.

Pour construire le répertoire dist

```sh
npm install
npm run build
```

Les fichiers à placer en serveur seront générés en dossier

**dist/erdline-ihm/browser**


# Idées d'améliorations


Afin de faciliter les mises à jours futures du projet, il est inclus dans le projet une liste d'idées
d'amélioration. Ces idées d'améliorations pourront servir de bases pour de futures mises à jours, et
être soient reprises telles quelles, soit servir d'inspirations pour des idées à implémenter.


[doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      

