
# TO DO

- Erdline en haut remplacer par bandeau proche mynrista
- Etre cohérent et utiliser px comme reste erdline (enfin vw pour bandeau) 
- test ordi uniquement car le site ne gère pas le mobile
- déployer via OVH
- test rapidos version déployée
- BIEN changer le N° de version
- prévoir de merge / verif action / tag / release
- Supprimer TO DO

# Projet   

Ce projet contient le code du site internet Erdline, qui se connecte à l'API Erdline. Le
site internet réalise actuellement les fonctionnalités suivantes.

- Génération d'une documentation API depuis une interface graphique
- Génération de la documentation API en format Html
- Une page d'exemple de documentations déjà créées
- Une page d'accueil
- Une page "A propos"


Il est prévu dans le futur de pouvoir importer et exporter, depuis un format spécifique au
site Erdline. Ce qui fera le rôle de sauvegarde, pour pouvoir reprendre la création d'une
documentation API. Et cela, sans avoir à créer de comptes.


# Tests unitaires   

Pour lancer les tests unitaires

```sh
npx ng test --no-watch
```

Pour lancer les tests unitaires, et vérifier le taux de couverture

```sh
npx ng test --coverage --no-watch
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
npx ng serve
```

Vous pourrez alors vous connecter à l'url    

http://localhost:4200


# Profils / Environnements

Ce projet dispose de deux environnements, "development" et "production". Par défaut, exécuter
npx ng serve utilisera l'environnement "development", et exécuter npx ng build utilisera
l'environnement "production".

**Profil development:**  Utilisation d'une API localhost     
**Profil production:**   Utilisation de l'API déployée    

Vous pouvez spécifier un autre environnement avec --configuration

```sh
npx ng serve --configuration production
```

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
npx ng build
```

Les fichiers à placer en serveur seront générés en dossier

**dist/erdline-ihm/browser**


# Documentations Supplémentaires


Afin de faciliter les mises à jours futures du projet, il est inclus un peu de documentation.
Il s'agit pour l'instant d'une liste de tests manuels, ainsi que de plusieurs idées 
d'améliorations.


**Tests Manuels:** [doc/tests.md](./doc/tests.md)    
**Idées d'améliorations:** [doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      

