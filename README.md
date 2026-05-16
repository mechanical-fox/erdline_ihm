
# TO DO

Ce qu'il faut faire, est marqué en partie note > Emploi > Idée projet.

0. Fait: Création database avec mot de passe PASSWORD et cela CAR je ne peux pas stocker de vrai mot de 
passe en développement... Je vais modifier le mot de passe après en déploiement.
1. Fait: Faire la partie API sur health
2. Fait: Faire la partie API sur color
3. Fait: Faire la partie API sur Sprite
3. Fait: IHM check Url Health au démarrage, dire 2s maximum, PAS de cercle de chargement. Et afficher message d'erreur si test raté.

3. Fait: Faire récupération des couleurs via API + FAIRE MESSAGE CONFIRMATION QUAND ENREGISTRE
    - fait : Présentation s'inspirer de sprite avec Expression 1, Expression 2 ...
    - now : voir à set la valeur au début via value + voir récupérer les valeurs via un event change... debut voir les value via un event change
    - valeur par défaut avec du rgb(153,153,153)

3. Fait: Faire création des couleurs via IHM, sans message confirmation, et sans compléter à 5
3. Fait: Faire un message quand on enregistre + il doit être compatible mobile + après avoir vérifié compatible mobile, faire timer pour qu'il disparaisse 
après x second
3. Fait: Permettre que interface complete à 4 couleur + que alors fait POST si est null + alors on doit RECUPERER id en base, à l'aide du header reponse
ou aura soucis + modifier reprsentation intern 

3. Fait: Faire création des sprites via IHM

3. Rapport au truc d'après... Voir qu'API peut eventuellement repondre vite, et que le soucis serait genre construction de HTML_Video.
Auquel cas, inutile de faire une url par sprite en base 64 à récupérer.
3. POUR SPRITE Loader + POUR PREVIEW + POUR JEU + Faire récupération des Sprites via API + ATTENTION RECUPERER listSprite DEPUIS ConfigurationCOmponent, 
et ATTENTION du coup je vais devoir modifier éventuellement les onglets "preview" ou bien "jeux", c'est les 2 ou je vois ou cela est appellé... Bref, 
regarder aussi les autres onglets.
3. Vérifier le temps de chargement des sprites, s'il est plus ou moins rapide qu'avant
4. faire la partie API sur les sessions : inscription + connexion. Doit être juste nom session + mot 
de passe. Aucun email.
5. Faire la partie IHM sur les sessions: inscription + connexion.
5. Faire que les urls POST pour color et sprite deviennent des URL authentifiés + à indiquer en Swagger aussi
6. Faire API sur sauvegarde si on est connecté
7. Gérer via IHM sur la sauvegarde si connecté
8. Faire en sorte que les parties sur Configuration Background et sprite ne soient accesibles que si 
admin (doit être mis à la main en base de donnée)
9. Faire en README une documentation sur comment créer un admin
10. Vérifier que l'on a la vue mobile compatible sur configuration Background et sprite + partie sauvegarde.
11. Faire les tests unitaires
12. Faire les pages Tutoriel, Exemples, A propos
13. Mise à jour du README
14. Déployer AVANT de faire la merge request pour pouvoir tester. Au cas où il y a des soucis.
15. Déployer base donné avec scp et changer password avec exemple => ALTER ROLE davide WITH PASSWORD 'hu8jmn3';
16. Déployer API et tester
17. Déployer IHM et tester
18. Faire deploiement AVANT les merge request. Voir si pas de soucis.
    

Fin: 
- Ai je bien gérer le fait d'appeler une url health à la connexion + d'afficher
toute une page entière si serveur down ? Voir le site mynrista
- READ à modifier
- Tester le comportement si serveur down. Voir si le message apparait
- Faire des tests pour la vue mobile
- après déploiement tester avec mon VRAI mobile aussi
- Faire attention à ce que la partis "A propos" soit à jour
- Changer les fichiers de doc pour idée amélioration + tests manuels.
- tester manuellement
- écrire les tests unitaires
- préparer portfolio les nouvelles images ihm et API
- retester les tests unitaire 
- vérifier % couverture ok
- déployer
- tester VUE MOBILE SUR TEL une fois déployé + cela AVANT
de valider merge request
- test version déployée + avec TEL aussi
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


# Idées d'améliorations


Afin de faciliter les mises à jours futures du projet, il est inclus dans le projet une liste d'idées
d'amélioration. Ces idées d'améliorations pourront servir de bases pour de futures mises à jours, et
être soient reprises telles quelles, soit servir d'inspirations pour des idées à implémenter.


[doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      

