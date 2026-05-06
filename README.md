
# TO DO

Ce qu'il faut faire, est marqué en partie note > Emploi > Idée projet.

A faire:

1. Fait: Gérer une liste pour gérer plusieurs décors, avec ajouter / modifier / supprimer
2. Fait: Faire séparer au niveau du code, tout ce qui est la partie décor, du reste. Bref, créer un composant en plus.
     Refactoriser.
2. Fait: Factorisation de la liste d'item de l'onglet décor. Comme on va utiliser des listes proches pour les personnages.
2. Fait: Finir ecran personnages

3. 
   - Fait: Proposer le décor à mettre
   - Fait: Permettre ajouter un texte : Personnage, expression, texte
   - Fait: Message d'erreur à l'ajout d'un texte si Personnage, ou expression, est non-renseigné
   - Fait: Gérer l'ajout des textes sans personnage. Ajouter le choix "Narration", et alors afficher le texte
        en italique.
   - Fait: Pour permettre modification d'un texte plus facile --> Séparer le composant "Ajout Message"
   - Fait: Permettre modifier un texte
   - Fait: Permettre de supprimer un texte
   - Fait: Faire que les seuls décors selectionnables en scène, soient ceux crées plutôt que Parc, Bar, Scène musique...
   - Fait: Gestion switch ENTRE SCENE #1, #2


   - Je suis au GOTO (voir après), entre autre l'aspect graphique.
        Hum... déjà ne permettra d'ajouter que des scènes, qui existent et qui sont autre que nous.
        1. Fait (Hors bug): Faire aspect graphique avec pour GO TO un select qui ne permet d'ajouter que des scènes autres que notre scène
        2. Fait: Faire que à chaque sélection de scene dans messageBox l'on reset la box (mise à jour transition) + l'on reset les élements
        3. Fait: Faire que à chaque création de scène dans messageBox l'on reset la box (mise à jour transition) + l'on RELOAD les élements
        4. Fait: Faire que à chaque suppresion de scene dans messageBox l'on reset la box (mise à jour transition) + l'on reset les élements
        5. Fait: Faire affichage dans la liste de message (hors box)
        6. Fait: Faire que l'edition des transition soit fonctionnelle, car actuellement cela n'est pas le cas
        6. Fait: Vérifier que les éditions hors transitions soient toujours fonctionnelles
        7. Fait: Faire que en édition de message de type != transition il soit impossible de choisir transition
        8. Fait: Faire que si message final = transition alors l'on ne propose plus d'ajouter des messages. Cela doit être effectif
             après l'ajout de messages, l'édition de message, la suppression de messages.

   - Faire que l'icone édition soit incluse dans le html afin d'être chargé plus vite
   - Gérer la gestion des GO TO, et des choix, avec les switchs d'onglets ENTRE ONGLETS
   - Gérer la gestion des GO TO, et des choix, avec les switchs d'onglets ENTRE SCENE #1, #2
   
3. Gérer tout ce que j'ai fait avant en vue mobile. Au besoin, pour le text-area en scene faire que le paramètre nombre de colonne soit 
    généré dynamiquement et utiliser quelque chose genre windows.width ou autre. Chercher le nom sur internet.
4. Débuter le fait de montrer un Jeu en train de Jouer. Bref l'onglet "jouer". Ou alors, peut être avant me faut il
    plus de sprites ?
4. Maintenant faire le jeu en train de jouer, mais gérer en plus les différentes expressions d'un personnage. L'idée est que
    même sans gérer les choix, gérer les différentes expression cela peut être utile.
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


Afin de faciliter les mises à jours futures du projet, il est inclus dans le projet une liste de 
tests manuel afin de pouvoir facilement vérifier le bon fonctionnement du projet.

De plus, il est aussi inclus une liste de futures idées d'améliorations.

**Tests Manuels:** [doc/tests.md](./doc/tests.md)    
**Idées d'améliorations:** [doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      

