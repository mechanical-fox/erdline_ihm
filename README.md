

# Projet   

Ce projet contient le code du site internet Erdline, qui se connecte à l'API Erdline. Le    
site internet réalise actuellement les fonctionnalités suivante.   

- Génération d'une documentation API depuis une interface graphique    
- Génération de la documentation API en format Html    
- Le site internet contient une page d'exemple de documentations déjà crées   
- Une page accueil, et une page A propos sont également crées  


Il est prévu dans le futur de pouvoir à la fois exporter en format OpenAI, et importer   
en format OpenAI. Cela permettra aussi aux utilisateurs de pouvoir ainsi sauvegarder   
les documentations d'API déjà crée.   


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


# Build Docker   

Si vous souhaitez utiliser une image docker.    
Vous pouvez construire l'image docker avec la commande suivante.   
Faites attention à modifier le numéro de version, selon la version de votre ihm.         

```sh
docker build -t erdline_ihm/1.0  .
```

Et le lancement en interactif pour tester avant déploiement se fait avec la commande suivante.
En production, le flag -it devra être remplacé par -d, et --name.

```sh
docker run -it -p 80:80 erdline_ihm/1.0
```

Vérifiez alors que vous puissez vous connecter à l'interface graphique

http://127.0.0.1

    
# Deploiement Hebergeur web    

Si vous souhaitez déployez l'application via un hebergeur web.     
Tout d'abord, il vous faut construire le répertoire dist pour le serveur.     

```sh
npm install
npx ng build
```

Vous avez ensuite à dist/erdline-ihm/browser un répertoire qui correspond à ce    
que vous pouvez mettre à servir à un serveur comme répertoire dist.   

Pour tester le rendu, sur votre PC vous pouvez utiliser 

```sh
cd dist/erdline-ihm/browser
python3 -m http.server 80
```

Vérifiez alors que vous puissez vous connecter à l'interface graphique

http://127.0.0.1
