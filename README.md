
# TO DO


14. Fait: Entrer une histoire exemple en visual novel

14. Fait (% couverture était encore bon): ajout tests unitaires IHM si necessaire
14. Fait: Ajout de tests unitaires API
14. Fait: Faire la page A propos
14. Fait: Vérifier que la vue mobile fonctionne en page A propos (F12, et modifier la largeur)
15. Fait: Mise à jour du README ihm

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
- Tester le comportement si serveur down. Voir si le message apparait
- Changer les fichiers de doc pour idée amélioration + tests manuels. --> A été fait, ces fichiers n'étaient présent que en 
      partie ihm
- changer N° version
- Faire merge request / check github action / release
- supprimer TO DO

# Projet   

Ce projet contient le code de la partie frontend / graphique, du site Erdline. Ce site à pour but de permettre la création de jeux de
type Visual Novel. Afin d'aider à pouvoir plus facilement tester une idée de Visual Novel, des sprites de base sont fournis, et il
est utilisé comme décors de simples dégradés de couleurs.

Les fonctionnalités actuelles sont les suivantes:
- Sauvegarde via le système de session
- Possibilité de créer des Visual Novels kinetic (= sans choix)
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

