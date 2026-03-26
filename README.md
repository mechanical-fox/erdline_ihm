
# TO DO

Ce qu'il faut faire, est marqué en partie note > Emploi > Idée projet.

Actuellement faire les onglets à gauche, dans l'onglet édition
Après:

1. NOW: Gérer ajout / suppression de décor dans l'onglet approprié
    - Après reflexion pour la liste cela doit être en haut, et cela doit être 100% du texte aucune image (texte sera nom du décor) +
        cela permettra de réutiliser ce style de liste pour les personnages, et pour les scènes
    - Les décors sont par défaut nommés #1, #2... Le nom peut être changé
    - Les décors sont visibles en bas, et on peut les selectionner
    - Les décors cela est juste un background à 2 couleurs, et on choisit les 2 couleurs
    - Il apparait la preview du décor
2. Gérer ajout / suppression de personnages dans l'onglet approprié. Utiliser des rectangles actuellement.
    - Attention, l'on doit pouvoir gérer un personnage, et plusieurs expressions
3. Gérer la création des scènes. Donc ajout ET SURTOUT édition, et suppression.
    Je dois pouvoir à la fois choisir un personnage, et une expression.
    Mon idée est de faire un peu comme en jeu gatcha, des genres de "bulle texte". Et de faire en sorte que
    en cliquant dessus cela soit modifiable. Et voir à tester comment présenter l'édition / création.
    Mon idée cela est des checkbox pour les personnages, checkbox pour l'expression.
    Et le texte, dans un text-area qui aura la même largeur que celui affiché une fois validé (voir comment faire).
    Et pas de bouton ajouter. Cela sera juste quand l'on clique en dehors du text-area.
4. Débuter le fait de montrer un Jeu en train de Jouer. Bref l'onglet "jouer". Ou alors, peut être avant me faut il
    des sprites ?
5. Prendre document de base, et voir le plus urgent. Mais bref, penser à un moment à faire une vrai API.
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

