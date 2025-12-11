

# Tests Manuels


Ceci est une suite de tests manuels, afin de vérifier que le logiciel fonctionne tel qu'attendu.   

## Test 1 - Vérification des couleurs   


Générer une documentation avec des méthodes GET, POST, PUT.    
Et indiquer pour chacun des méthodes les codes 200, 400, 404.   

Il faudra vérifier que dans la documentation générée:

- Le GET apparaisse de couleur verte
- Le POST apparaisse de couleur bleu
- Le PUT apparaisse de couleur orange
- Les codes de status 200 apparaissent en vert
- Les codes de status 400 et 404 apparaissent en rouge


## Test 2 - Vérification d'affichage : Endpoint sans paramètres, et sans exemples

Générer une documentation avec un endpoint, pour lequel aucun paramètre n'est rempli. Et pour lequel   
aucun exemple n'est rempli. Donc ni body, ni reponse.   

Il faudra vérifier que dans la documentation générée:

- La rubrique Paramètre inclus le texte "Aucun paramètres requis"
- La rubrique Exemple inclus le texte "Endpoint ne renvoyant pas de résultats"


## Test 3 - Vérification des onglets

Générer une documentation avec deux endpoints, qui chacun exprime un body et une réponse, qui   
sont chacun différent.   

Il faudra vérifier que dans la documentation générée:

- Que l'on peut passer des onglets "body" à "réponse", ce qui modifie le texte affiché
- Qu'il est bien affiché les valeurs attendues


## Test 4 - Vérification du sommaire

Générer une documentation avec deux endpoints, ayant une valeur de tag différente.   
Le tag correspondant aux groupes, utilisés pour regrouper les endpoints.   
Choisir les valeurs de tag "Rapports" et "Bucket".   

 
Il faudra vérifier que dans la documentation générée:

- Appuyer sur le mot "Rapport" renvoit vers la section Rapports
- Appuyer sur le mot "Bucket" renvoit vers la section Bucket

## Test 5 - Vérification du bouton Charger Exemple


Cliquer sur le bouton "Charger exemple" sur la page Génération.   

Vérifier que en bas il soit indiqué 5 endpoints, et que ceux-ci soient complétement remplis.     
Ensuite cliquer sur le bouton "Voir Html", et vérifier que le Html généré inclus 5 endpoints, et que la    
documentation générée semble correcte.   
 
Il faudra vérifier que dans la documentation générée:

- Appuyer sur le mot "Executions" renvoit vers la section Executions
- Appuyer sur le mot "Resultats" renvoit vers la section Resultats
- Si l'on appuye 2 fois sur le mot "Executions" en ayant changé de position, l'on revient bien à la section "Executions"

## Test 6 - Visualisation des Exemples

Vérifier sur le site internet à l'onglet "Exemples" que:   

- Deux exemples soient déjà renseignés (Sinon les ajouter via l'API)
- Cliquer sur le bouton "Voir" ouvre un deuxième onglet avec la documentation attendu
- Cliquer sur le bouton "Télécharger" va télécharger une page internet, qui soit identique à celle du bouton "Voir" 

## Test 7 - Ajout et suppression d'exemple

Vérifier que je puisse ajouter et supprimer des exemples depuis ces deux urls.   
Utiliser obligatoirement le logiciel Bruno pour le test, car le Swagger ne gère pas très bien le header Authorization     
actuellement.    


POST /example/htmlId/{htmlId}/saveAs/{name}    
DELETE /example/{htmlId}    

Pour Vérifier si une url est bien ajoutée ou supprimée:   
- Se rendre sur le site internet à l'onglet "Exemples"   


## Test 8 - Vérification de la présence du mot de passe

Tester que pour les 2 urls suivante, le mot de passe soit bien obligatoire. Ou sinon une erreur 401 est renvoyée. 
De même, vérifier que les mauvais mot de passe renvoient bien une erreur. 

POST /example/htmlId/{htmlId}/saveAs/{name}
DELETE /example/{htmlId}

Tester que pour l'url suivante, le mot de passe soit optionnel

GET /example