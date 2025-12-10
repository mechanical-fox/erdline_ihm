
# TO DO


**Actuel:**

    Rappel: API et Site sont tous deux en https
        9.  Fait: Ajout "www.erdline.fr" en plus de "erdline.fr" en CORS policy
        10. Fait: deployer IHM et tester après ajout url
        11. Fait: Reindenter le README avec "pas de quadruple espace en fin, car cela rend peu super sur github"
        
        12. Vérifier sur Github l'affichage obtenu
        12 bis. VERIFIER ORTHOGRAPHE avant merge request
        13. Faire un pull request / merge pour tout ce qui est DATABASE + idem tag / release
        14. Faire les taches écrites juste en dessous
        15. Supprimer TO DO
        15 bis. VERIFIER ORTHOGRAPHE avant merge request
        16. Faire  pull request / merge + tag + release pour INTERFACE GRAPHIQUE
        
          
# Projet   

Ce projet contient le code du site internet Erdline, qui se connecte à l'API Erdline. Le
site internet réalise actuellement les fonctionnalités suivantes.

- Génération d'une documentation API depuis une interface graphique
- Génération de la documentation API en format Html
- Une page d'exemple de documentations déjà crées
- Une page d'accueil
- une page "A propos"


Il est prévu dans le futur de pouvoir importer et exporter, depuis un format spécifique au
site Erdline. Ce qui fera le rôle de sauvegarde, pour pouvoir reprendre la création de
documentation API, et cela sans avoir à créer de compte.

Il est aussi prévu de permettre d'exporter les documentations en format OpenAI.

# Tests unitaires   

Pour lancer les tests unitaires, vous pouvez executer la commande suivante

```sh
npx ng test --no-watch
```

Pour lancer les tests unitaires, et vérifier le taux de couverture des tests

```sh
npx ng test --coverage --no-watch
```
La seconde commande échouera en cas de coverage insuffisant. De plus, la seconde commande
génère un rapport html sur le coverage obtenu dans le répertoire

**coverage/erdline-ihm**

# Execution    

Installez tout d'abord les dépendances du projet avec

```sh
npm install
```

Ensuite vous pouvez démarrer le site internet en local avec

```sh
npx ng serve
```

Vous pourrez alors vous connecter à l'url    
http://localhost:4200


# Profils / Environnements

Ce projet dispose de deux environnements, "development" et "production". Par défaut, executer
npx ng serve utilisera l'environnement "development", et executer npx ng build utilisera
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


    
# Deploiement    


Un site internet se déploie en remplacant dans un serveur spécifique les fichiers html, css,
et javascript, correspondant au site. L'on parle généralement de répertoire dist, car il faudra
généralement dans le serveur, placer ces fichiers dans un répertoire appellé dist.

Tout d'abord, il vous faut construire le répertoire dist pour le serveur.

```sh
npm install
npx ng build
```

Vous avez ensuite à dist/erdline-ihm/browser un répertoire qui correspond au dossier dist
à placer sur votre serveur.


# Documentation Supplémentaires


Afin de faciliter les mises à jours futures du projet, il est inclus un peu de documentation.
Il s'agit pour l'instant d'une liste de tests manuels, ainsi que de plusieurs idées d'améliorations.


Tests Manuels: [doc/tests.md](./doc/tests.md)    
Idées d'améliorations: [doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      
   