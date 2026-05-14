

# Idées d'amélioration


Voici ci-dessous quelques idées d'améliorations pour le futur.

## Idée 1 - Optimisation des images

Voir si les images peuvent oui ou non être transmises plus rapidement à l'aide de 3
façons.

1. Reduction de la taille des images. Car celles ci sont de tailles supérieurs au besoin
(600 de hauteur, contre 420 maximum en Drawer).
2. Une fois que l'API est mise, voir si l'on effectue des conversions en base64 et binaire
de façon intempestive, ou non. Mais attendre d'avoir l'API, car actuellement il est un
peu dur d'être absolument certain de ou vient le problème, avec tout ce que fait Angular.
3. Revérifier si le Sprite Loader à bien un cache fonctionnel, et s'il est bien capable 
de charger 2 images en même temps.

## Idée 2 - Edition Message Bouton Annuler

Dans l'onglet scène, lors de l'édition des messages, faire apparaitre un bouton
"annuler".


## Idée 3 - Ajout de choix

Actuellement, la seule façon de finir une scène est de faire une transition vers une autre scène.
Prévoir dans le futur, de permettre aussi d'ajouter des choix. Ce qui est une fonctionnalité courante
des visuals novel.

Il faudra prévoir les fonctionnalitées suivantes:
1. Un choix qui n'apparait que si un ou plusieurs evenements sont présents
2. Un choix qui n'apparait que si un ou plusieurs evenements sont absents
3. Cliquer sur un choix doit envoyer vers une nouvelle scène
4. Cliquer sur un choix pourra ajouter un évènement
5. Un évènement sera simplement défini par un nom


## Idée 4 - Transition conditionnelles

Après l'ajout des choix, et donc des évènements, ajouter des transitions conditionelles.
Cela seront des transitions qui renverront vers différentes scènes, selon la présence, ou l'absence
de différents évènements.

Actuellement, il est codé des transitions pour aller d'une scène à l'autre. Mais il n'est pas codé
de transition conditionnelles.


## Idée 5 - Export Fichier

En plus du système de sauvegarde par session, il pourrait être bien de permettre a des personnes d'importer,
ou d'exporter leurs projets via un fichier. Le fichier pourrait être par exemple un simple JSON, mais ensuite
derrière je donne une petite extension fantaisie.


