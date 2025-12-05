
# TO DO


**Actuel:**

    Rappel: API et Site sont tous deux en https
        5. Fait: J'ai fait à la main les tests manuels mis
        6. Fait: Déploiement API Prod + Merge request, tag ...
        7. Fait: Connecter l'ihm sur API prod depuis mon ordinateur + voir si cela marche (Html et exemples)
        8. Faire les tests unitaires IHM
        8 bis. Indiquer la commande de test unitaire + ou lire le % de couverture de code
        9. Mettre la CI/CD pour IHM
        9 bis. Reindenter le README avec "pas de quadruple espace en fin, car cela rend peu super sur github"
        10. Faire les taches écrites juste en dessous
        10 bis. Vérifier sur Github l'affichage obtenu
        11. Faire  pull request / merge + tag + release pour IHM
        12. Faire aussi un pull pour tout ce qui est database :p + pas de tag par contre
          

    - verifier CHAQUE commande indiqué en README, donc docker ou autre, que celle-ci fonctionne.
    - README voir si je dois réécrire la présentation
    - README Ecrire une partie build
    - README Ecrire la partie comment lancer les tests unitaires sur chaque applicatif
    - README Ecrire comment configurer dev et prod
    - En README réécrire la présentation du projet pour bien dire qu'il a une API et qu'il y a une IHM en Angular.
    - Ecrire en READ ME les Dépendances du projet (Java, Maven, NodeJS je suppose)
    - ENLEVER site_construction qui sera devenu inutile
    - Faire un tag "sans texte" et une relise
    - Supprimer to do



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