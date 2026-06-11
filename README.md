
# TO DO


11. Fini: Faire les tests unitaires IHM
12. Fini: Faire les tests unitaires API

13. Fait: Rentrer le sprite Nathaniel
14. Fait: Faire en API l'url PUT example, et GET example

14. Fait: Faire appaitre exemple en IHM
14. Fait: Tester en IHM la page Example fonctionne même si non connecté
14. Fait: Tester en IHM que la page "Jouer" et non pas "Example" fonctionne toujours

14. Fait: Résoudre le bug... avec les premiers sprites à montrer dans mon example qui sont mal déterminés
... cela pique les yeux
14. Entrer une histoire exemple en visual novel. Surement reprendre de mon ancien projet.
Et modifier une fille en garcon, car j'ai 2 sprites garcon. A voir.
14. Vérifier à nouveau si j'atteint le % de tests unitaires
14. ajout tests unitaires IHM si necessaire
14. AJout tests unitaire API si necessaire
14. Après reflexion ne PAS faire tutoriel, et ainsi cela va être plus rapide !! Hourra, car cela m'ennuyai !!
Mode agile. On s'arrete après les 3 mois. L'agilité, c'est bien !!
14. Faire la page A propos + ne PAS faire tutoriel
15. Mise à jour du README ihm
16. Mise à jour du README api
17. Ecrire de modifier commun_database pour y mettre mes bases erdline + mynrista + indiquer mes mots de passe que
j'aurai surement mis à password !! Et indiquer pourquoi. Car cela est un petit projet...
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
- Faire attention à ce que la partis "A propos" soit à jour
- Changer les fichiers de doc pour idée amélioration + tests manuels.
- tester manuellement
- écrire les tests unitaires
- retester les tests unitaire 
- vérifier % couverture ok
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

