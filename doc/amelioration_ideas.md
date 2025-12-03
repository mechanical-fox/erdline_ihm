

# Idées d'amélioration


Voici ci-dessous quelques idées d'améliorations pour le futur.   

**Idée 1:** Pouvoir importer et exporter depuis un modèle de fichier spécifique au site Erdline.    
Ce qui permettra de réaliser des sauvegardes.   

**Idée 2:** Pouvoir exporter depuis un fichier OpenAI. Et ne PAS faire l'importation après réflexion.   
Histoire de simplifier le processus.   

**Idee 3:** Permettre d'editer, même après avoir ajouté une url. L'idée est de modifier totalement    
la vue. Au lieu de faire des onglets, faire juste "tag" - "indentation" - "methode url" et à côté
des boutons éditer et supprimer.

**Idee 4:** Ajouter en base de donnée une table "log" qui sera remplie à chaque appel de 
l'API. Elle devra indiquer l'action effectué, mais pas l'IP de la personne qui l'a effectué.
L'idée est de suivre l'utilisation de l'API

**Idée 5:** Pouvoir ajouter des descriptions aux urls, paramètres, ainsi que une description sur 
la totalité de l'API. Ce qui est fait par Swagger. Aussi au niveau url, permettre à la fois de
remplir les summary, et la description longue. 

**Idée 6:** Ajouter le type de sorties, et autoriser XML, JSON, texte simple, octet, html.    

**Idée 7:** Envoyer une erreur si le type XML, JSON ou HTML est choisie, mais que le type n'est 
pas respecté. Pour l'html concrétement, vérifier en passant dans un parseur XML.    
 
**Idée 8:** Indenter et colorer pour les types JSOn et XML. A faire assez logiquement uniquement
si l'on a vérifier le type. Eventuel Aussi colorer l'html si comme je le pense l'html est juste 
du xml.  

**Idée 9:** Ajouter eslint + indiquer en README   
