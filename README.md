
# TO DO

Ce qu'il faut faire, est marqué en partie note > Emploi > Idée projet.

0. Fait: Création database avec mot de passe PASSWORD et cela CAR je ne peux pas stocker de vrai mot de 
passe en développement... Je vais modifier le mot de passe après en déploiement.
1. Fait: Faire la partie API sur health
2. Fait: Faire la partie API sur color
3. Fait: Faire la partie API sur Sprite

3. IHM check Url Health au démarrage, dire 2s maximum, pas de cercle de chargment. Et afficher cercle de chargement si test raté.
3. Faire récupération des couleurs et sprites via API
3. Faire la partie IHMsur configuration des couleurs background, et sprite. Donner accès à tous.
4. faire la partie API sur les sessions : inscription + connexion. Doit être juste nom session + mot 
de passe. Aucun email.
5. Faire la partie IHM sur les sessions: inscription + connexion.
5. Faire que les urls POST pour color et sprite deviennent des URL authentifiés + à indiquer en Swagger aussi
6. Faire API sur sauvegarde si on est connecté
7. Gérer via IHM sur la sauvegarde si connecté
8. Faire en sorte que les parties sur Configuration Background et sprite ne soient accesible que si 
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

