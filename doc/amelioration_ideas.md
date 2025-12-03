

# Idées d'amélioration


Voici ci-dessous quelques idées d'améliorations pour le futur.   


**Idee 1:** Permettre d'editer, même après avoir ajouté une url. L'idée est de modifier totalement    
la vue. Au lieu de faire des onglets, faire juste "tag" - "indentation" - "methode url" et à côté
des boutons éditer et supprimer.

**Idee 2:** Ajouter en base de donnée une table "log" qui sera remplie à chaque appel de 
l'API. Elle devra indiquer l'action effectué, mais pas l'IP de la personne qui l'a effectué.
L'idée est de suivre l'utilisation de l'API

**Idée 3:** Pouvoir exporter en fichier OpenAI    

**Idée 4:** Pouvoir importer depuis un fichier OpenAI    

**Idée 3:** Pouvoir ajouter des descriptions aux urls, paramètres, ainsi que une description sur 
la totalité de l'API. Ce qui est fait par Swagger. Aussi au niveau url, permettre à la fois de
remplir les summary, et la description longue. 

**Idée 4:** Ajouter le type de sorties, et autoriser XML, JSON, texte simple, octet, html.    

**Idée 5:** Envoyer une erreur si le type XML, JSON ou HTML est choisie, mais que le type n'est 
pas respecté. Pour l'html concrétement, vérifier en passant dans un parseur XML.    
 
**Idée 6:** Indenter et colorer pour les types JSOn et XML. A faire assez logiquement uniquement
si l'on a vérifier le type. Eventuel Aussi colorer l'html si comme je le pense l'html est juste 
du xml.  

**Idée 7:** Ajouter eslint + indiquer en README   
