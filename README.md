
# TO DO


**BUG A Resoudre:**
    - Nom API perdu dès lors que je fais un ajout d'exemple

**Actuel:**

    Rappel: API et Site sont tous deux en https
        1. Fait: Finir page Accueil
        2. Fait: Finir Page A propos
        2. Résoudre le bug "Nom API perdu dès que je fais ajout d'exemple"
        3. Faire les tests manuels
        4. Faire les tests unitaires + Hibernate, vérifier swagger
        5. Changer doc en API pour dire de faire UNIQUEMENT deploiement docker, et tester avec mon server   
            L'idée est que cela simplifiera beaucoup quand même. Que cela soit le processus, ou la   
            documentation.   

    

    - Fait: Résolution bug IHM avec API en https (refus certificat non signé) -> résolution marqué en haut
    - Fait: Faire les profils Java + Synthèse marquer comment mettre en place / executer profil
    - Fait: modifier README API pour indiquer API profil + comment executer
    - Fait: Faire profils Angular + synthèse marquer comment mettre en place / executer profil
    - Fait: modifier README IHM pour indiquer IHM profil + comment executer
    - Fait: Connexion à une base de donnée locale, et réalisation des opérations de base
    
    - Actuel: Faire prod connexion + sans mettre mot de passe en README + mot de passe est stocké dans mon fichier keypass

    - Séparer en 3 repos sur Github au lieu de 1.
         Donc erdline_api, erdline_ihm et database (A mettre en privée ou public le dernier).
    - README indiquer le mot de passe à indiquer en variable environnement avant de lancer. 
         Et sinon qu'il y aura soucis.
    - Attention arreter mon docker pour base de donnée en local...
    - Gérer contact base donnée prod
    - IMPORTANT dans tests modifier le test "charger exemple" en indiquant le vrai nom des endpoints prix...
    - Marquer README comment faire secret et tout pour PROD
    - Faire le bouton "Charger Exemple"
    - Faire les tests manuels déjà écrits + voir tester page exemple
    - Faire les Pages Accueil, A propos et Exemples (Necessitera JPA + base donnée)
    - Faire tests unitaires DONT HYBERNATE + images dockers
    - verifier CHAQUE commande docker indiqué + la commande python pour ihm, que celle-ci fonctionne.
       Et cela avec les liens indiqués en README. ATTENTION à garder les commandes docker, comme je présente cela comme
       exemple.
    - Pour la page exemple, faire montrer html généré, yaml généré + crée une url "Ajouter exemple" qui ajoute en exemple
        le dernier envoie que l'on à fait, avec le bouton "voir html"

    - Finalement en README en faire UN PAR FICHIER + UN GENERAL, ou j'explique le principe. Car sinon niveau execution,
        configuration, ... cela va être dur

    - ATTENTION deploiement serveur je vais devoir changer le certificat car celui actuellement utilisé avec alias
        "whatever" et j'ai actuellement changé ma synthèse + le code java pour utiliser l'alias "certificat".
    - README Ecrire une partie build
    - README Ecrire la partie comment lancer les tests unitaires sur chaque applicatif
    - README Ecrire comment configurer dev et prod
    - En README réécrire la présentation du projet pour bien dire qu'il a une API et qu'il y a une IHM en Angular.
    - Ecrire en READ ME les Dépendances du projet (Java, Maven, NodeJS je suppose)
    - ENLEVER site_construction qui sera devenu inutile
    - Faire un tag "sans texte" et une relise
    - Supprimer to do


- Attention, toujours penser à commit en "cd .." car j'ai deux projets




# Projet   

Ce projet contient le code du site internet Erdline, qui se connecte à l'API Erdline. Le    
site internet réalise actuellement les fonctionnalités suivante.   

- Génération d'une documentation API depuis une interface graphique    
- Génération de la documentation API en format Html    
- Le site internet contient une page d'exemple de documentations déjà crées   
- Une page accueil, et une page A propos sont également crées  


Il est prévu dans le futur de pouvoir importer et exporter, depuis un format spécifique au   
site Erdline. Ce qui fera le rôle de sauvegarde, pour pouvoir reprendre la création de    
documentation API, et cela sans avoir à créer de compte.        

Il est aussi prévu de permettre d'exporter les documentations en format OpenAI.   


# Execution    

Installez tout d'abord les dépendances du projet avec   

```sh
npm install
```

Ensuite vous pouvez soit servir directement le site internet avec 

```sh
npx ng serve
```

Le site internet sera disponible à l'url suivante
http://localhost:4200  

Vous pouvez aussi construire un répertoire dist, avec la commande

```sh
npx ng build
```

# Profils / Environnements

Ce projet dispose de deux environnements, "development" et "production".    
Par défaut, executer npx ng serve utilisera l'environnement '"development", et executer       
npx ng build utilisera la configuration production.

**Profil development:**  Utilisation d'une API localhost
**Profil production:**   Utilisation de l'API déployée

Vous pouvez spécifier un autre environnement avec --configuration

```sh
npx ng serve --configuration production
```

Les valeurs utilisées peuvent être trouvées dans les fichiers suivants
[src/environments/development.ts](./src/environments/development.ts)
[src/environments/production.ts](./src/environments/production.ts)


    
# Deploiement    

Si vous souhaitez déployez l'application via un hebergeur web.     
Tout d'abord, il vous faut construire le répertoire dist pour le serveur.     

```sh
npm install
npx ng build
```

Vous avez ensuite à dist/erdline-ihm/browser un répertoire qui correspond au dossier dist   
que l'on donne à servir à un hébergeur web.    


# Tests   

Afin de vérifier le bon fonctionnement du logiciel, une suite de tests manuels est inclus.   
Celle-ci est constituée d'un total de 5 tests. Voir le fichier   

[doc/tests.md](./doc/tests.md)    

# Idées d'améliorations    


Quelques idées d'amélioration ont été préparées en avance pour ce site.   
D'autant que le site est actuellement dans une version assez alpha.   

Pour des soucis de lissibilité, les idées d'améliorations sont regroupées dans le fichier    

[doc/amelioration_ideas.md](./doc/amelioration_ideas.md)    