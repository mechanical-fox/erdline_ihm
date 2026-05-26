
# TO DO

26/05/2026:
    - début séance: 21,9 % statement et 18,07% branche
    - 36.9 % et 30.65%

11. Faire les tests unitaires IHM
    -> Changer de Component à tester.
    -> Pour rappel, mon test unitaire en edit avait un bug qui n'apparaisait pas en test manuel... donc j'ai juste abandonné.
    -> Tester GameComponent + refaire des load avec SavingUtil... Cf composant testé juste avant
    -> Pour GameComponent, il va falloir ajouter des attributs, qui servirons uniquement au test unitaire pour suivre le test :p

11. Bug Coverage SavingCOmponent résoudre --> Cela est lié à SessionTrackerUtil et son import de
    SavingComponent, ce qui déclenche le constructeur et tout. Toute fonction de SavingComponent utilisé ici 
    va devoir être mis dans une autre classe, genre SavingUtil ou un nom plus jolie.
11. Git push, en disant que bug coverage sur SavingComponent résolu, ou autre texte
    
12. Faire les tests unitaires API
13. Entrer en exemple, mon texte de départ mais sur mon AUTRE visual novel + j'aurai sans doute besoin du sprite
de Nathaniel, afin d'avoir assez de personnages
14. Faire les pages Tutoriel, Exemples, A propos + surtout le tutoriel qui va être long
15. Mise à jour du README ihm
16. Mise à jour du README api
17. Ecrire de modifier après (Genre écrire agenda) les 2 projets mynrista pour ne plus appeller mail, et passer en
port 8081 + penser à changer n° version, et faire merge request + check les tests unitaires


17. Déployement API -> changer le texte. Ne même plus parler certificat https. Changer l'image docker.
Vérifier que capp pourra se connecter à cdatabase.
17. Deploiement IHM --> Inutile de faire !! Le texte présent actuellement est bien au passage.
21. Faire deploiement AVANT les merge request. Voir si pas de soucis.


Fin: 
- README à modifier
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
npm run build
```

Les fichiers à placer en serveur seront générés en dossier

**dist/erdline-ihm/browser**


# Idées d'améliorations


Afin de faciliter les mises à jours futures du projet, il est inclus dans le projet une liste d'idées
d'amélioration. Ces idées d'améliorations pourront servir de bases pour de futures mises à jours, et
être soient reprises telles quelles, soit servir d'inspirations pour des idées à implémenter.


[doc/amelioration_ideas.md](./doc/amelioration_ideas.md)      

