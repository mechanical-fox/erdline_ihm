
# TO DO

Ce qu'il faut faire, est marqué en partie note > Emploi > Idée projet.

A faire:

1. Fait: Gérer une liste pour gérer plusieurs décors, avec ajouter / modifier / supprimer
2. Fait: Faire séparer au niveau du code, tout ce qui est la partie décor, du reste. Bref, créer un composant en plus.
     Refactoriser.
2. Fait: Essayer de factoriser les listes en haut. Et ne PAS utiliser de input/output, car malheureusement lors de l'update de
     nom, il n'y avait rien qui pouvait être fait.
2. Je pense pour les listes je vais devoir donner à Storage utile une fonction pour "add" et pour "select" (utilisé lors du delete).
     Ou alors juste une fonction pour le select... cela aiderait déjà. Car la je n'ai pas trop réussit à réduire la taille.
2. Gérer ajout / suppression de personnages dans l'onglet approprié. Utiliser mon unique sprite créé pour l'instant.
    - Attention, l'on doit pouvoir gérer un personnage, et plusieurs expressions
2 bis. Gérer la vue mobile pour les 2 onglets précédents
3 before. Voir à gérer la création des scènes SANS CHOIX pour la 1er version. Histoire d'envoyer rapidement.
    Donc on peut juste faire scène 1 -> scène 2. + Prévoir en idée d'amélioration le fait de pouvoir
    justement mettre des choix.
3. Gérer la création des scènes. Donc ajout ET SURTOUT édition, et suppression.
    Je dois pouvoir à la fois choisir un personnage, et une expression.
    Mon idée est de faire un peu comme en jeu gatcha, des genres de "bulle texte". Et de faire en sorte que
    en cliquant dessus cela soit modifiable. Et voir à tester comment présenter l'édition / création.
    Mon idée cela est des checkbox pour les personnages, checkbox pour l'expression.
    Et le texte, dans un text-area qui aura la même largeur que celui affiché une fois validé (voir comment faire).
    Et pas de bouton ajouter. Cela sera juste quand l'on clique en dehors du text-area.
3. Gérer la création des scènes en vue mobile. Au besoin, faire que le paramètre nombre de colonne soit généré dynamiquement
    et utiliser quelque chose genre windows.width ou autre. Chercher le nom sur internet.
4. Gérer le bug que si l'on remplie par exemple décor name, et que l'on va en page tutoriel... l'on perd les informations.
    Cela était lié au fait que tout était stocké dans Edition Component, et non pas NavComponent. Donc changer l'item affiché
    par NavComponent, fait perdre les données.
4. Débuter le fait de montrer un Jeu en train de Jouer. Bref l'onglet "jouer". Ou alors, peut être avant me faut il
    plus de sprites ?
5. Prendre document de base à note > emploi > idée projet, et voir le plus urgent. Mais bref, penser à un moment à faire une vrai API.
    Et des tests unitaires aussi. Et la sauvegarde.
    

Fin: 
- Ai je bien gérer le fait d'appeler une url health à la connexion + d'afficher
toute une page entière si serveur down ? Voir le site mynrista
- Tester le comportement si serveur down. Voir si le message apparait
- Tester les cercles de chargement si réponse lente. Mettre des sleep au niveau API.
- Faire attention à ce que la partis "A propos" soit à jour
- Changer les fichiers de doc pour idée amélioration + tests manuels.
- tester manuellement
- tester vue mobile via mobiles firefox + ATTENTION tel
comme honor10 sont très mince, donc vraiment il va falloir 
jouer au F12 sur la largeur fenêtre pour vérifier.
- écrire les tests unitaires
- préparer portfolio les nouvelles images ihm et API
- retester les tests unitaire 
- vérifier % couverture ok
- déployer
- tester VUE MOBILE SUR TEL une fois déployé + cela AVANT
de valider merge request
- test version déployée
- changer en portfolio les images pour ihm + API
- changer N° version
- Faire merge request / check github action / release
- supprimer TO DO

# Projet   

TO DO


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

