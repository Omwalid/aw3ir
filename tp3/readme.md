<div align="center">
      <img src="https://github.com/bilelz/tpaw/blob/master/galilee.png?raw=true" alt="Logo Master" width=100/>
  <br/>
  Master 3IR²</div>

  
<h3 align="center">TP AW #3 : Bootstrap</h3>


### Prérequis (⚠️ important)

* Lire **tout** l'énoncé  avant de commencer le TP.

❓❓Si vous avez des questions ou des erreurs dans votre code : 
* formater (indenter) bien votre code (raccourci Visual Studio Code : Ctrl + K puis Ctrl + F)
* demander à Google 🔍
* demander à vos camarades 👩‍🎓👨‍🎓
* demander au professeur 🙋

Table des matières
=================
- [Table des matières](#table-des-matières)
  - [1. Objectif du TP](#1-objectif-du-tp)
  - [2. Plateforme de dév](#2-plateforme-de-dév)
  - [3. Création du formulaire avec Bootstrap](#3-création-du-formulaire-avec-bootstrap)
  - [4. Validation Javascript](#4-validation-javascript)
  - [5. Affichage d'une popup (modal)](#5-affichage-dune-popup-modal)

 
  
  
## 1. Objectif du TP
* utiliser les composants graphiques de [Bootstrap](https://github.com/twbs/bootstrap) (v5.1.3), la librairie CSS la plus célèbre pour développer rapidement des pages web.
  


Bootstrap est le framework HTML/CSS/JS le plus populaire pour développer des sites web “responsive” et orientés “mobile-first”.

La version 5.1.3 (que nous utiliserons) vient de sortir, les tutoriels sur internet parlent encore donc souvent de la version 3 ou 4.

Le formulaire permettra de saisir les informations suivantes :
* Nom
* Prénom 
* Date de naissance
* Adresse postale
* Adresse mail

![Texte alternatif](image1.png "texte pour le titre, facultatif")   


## 2. Plateforme de dév

  * Télécharger le code source *compilé* *(Compiled CSS and JS)* de Bootstrap dans votre dossier TP3 :    https://getbootstrap.com/docs/5.1/getting-started/download/
 

A la fin du TP votre répertoire devra ressembler à ça:


```
tp3/
├── index.html
├── css/
│   ├── bootstrap.css
└── js/
    └── bootstrap.bundle.js
    └── form-validation.js
```


Copier ces imports de scripts JS et CSS dans la section \<HEAD\>

```html 

<!-- CSS boostrap -->
<link rel="stylesheet" href="css/bootstrap.css">

<!-- librairie Javascript de boostrap pour pouvoir utiliser les composants interactifs (modal https://getbootstrap.com/docs/5.1/components/modal/ , collapse...) -->
    <script src="js/bootstrap.bundle.js"></script>
```

## 3. Création du formulaire avec Bootstrap
      1. Sous la balise `<body>`, ajouter la DIV :
```html
<div class="container">
  <!-- Content here -->
</div>
```
**Tout votre code HTMl devra être dans cette DIV.**

   2. Elements principaux Bootstrap pour mettre en forme les formulaires
      1. Grilles : https://getbootstrap.com/docs/5.1/layout/grid/
      2. Formulaires : https://getbootstrap.com/docs/5.1/forms/layout/#forms
      * **Utiliser par exemple cette de mise en forme pour ce TP https://getbootstrap.com/docs/5.1/forms/layout/#horizontal-form**
      3. Boutons : https://getbootstrap.com/docs/5.1/components/buttons/

## 4. Validation Javascript

1. Créer votre script JavaScript form-validation.js
```html
<script src="js/form-validation.js"></script>
```
Votre code JS sera structuré comme suit : 

```js
window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
   // voir plus : https://www.w3schools.com/js/js_htmldom.asp
    console.log( "DOM ready!" );
    
    // Y mettre le code Javascript pour valider tous les champs du formulaire
};
```

2. Règles de validation du formulaire : 
   * les champs texte doivent avoir **5 caractères mininum**
   * le mail doit être bien formaté
     * fonction de validation d'email
     ```js
     function validateEmail(email) {
       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase());
     }
     ```

   * la date de naissance ne peut pas être dans le futur
     * documentation sur l'objet javascript Date : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date
     * pour `parser` une date : 
       ```js
       let dateNaissance = new Date(2018, 8, 22); // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#syntaxe
       let dateNaissanceTimestamp = dateNaissance.getTime();
       ```
     * le timestamp actuel est récupérable avec `Date.now()`, voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/now
       ```js
       let nowTimestamp = Date.now()
       ```

    

3. Si tous les champs sont correctes, afficher une fenêtre modale (voir [partie 5](#5-affichage-dune-popup-modal)) avec une image statique Google Maps et un lien (ouvrant une nouvelle fenêtre/onglet) vers Google Maps

2. Fonctions ou méthodes pratiques de Javascript 

|                                 | Javascript                                          | 
|---------------------------------|-----------------------------------------------------|
|Attente du chargement de la page | window.onload = function(){ ... };                  |
|Selection d'un élément           | document.querySelector("#name")                     |
|valeur d’un champ de saisie               | document.querySelector("#name").value;              |
|Modifier du contenu HTML         | document.querySelector(".modal-body").innerHTML = '\<img src="map.jpg"/\>'   | 
|Modifier du contenu textuelle    | document.querySelector(".modal-title").textContent = "Chaine de caractère" | 
| interception de la soumission d'un formulaire | document.querySelector("form").addEventListener("submit", function (event) {<br/>   &nbsp; event.preventDefault();<br/>    &nbsp;&nbsp;console.log("form submitted!");<br/>  });  |
| interception du click sur un élément | document.querySelector("#submit").addEventListener("click", function(event){<br/> &nbsp;&nbsp;event.preventDefault(); <br/> &nbsp; console.log( "click" ); <br/>});  |

## 5. Affichage d'une popup (modal)
![Texte alternatif](image4.png "texte pour le titre, facultatif")   
Modal quand un champ est vide

   1. Ajouter ce code HTML à la fin de votre page HTML (avant la balise \</body\>)
   
   La modal devra avoir un identifiant (par exemple `myModal`) pour pouvoir être utiliser en javascript 
```html
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
               
            </div>
          </div>
        </div>
      </div>
```

   2. affichage de la modal
```js
var myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();
```

![Texte alternatif](image3.png "texte pour le titre, facultatif")   
Modal quand tous les champs sont OK

   3. Pour l'image voir documentation vers Google Static Maps API https://developers.google.com/maps/documentation/static-maps/
     
   * Clé Google Map Image à utiliser ```AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg```

      * Exemple avec une image centrée sur Paris: <a href="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg">
      <img src="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt='google map' width=200/>
      </a><br/>
      https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg

   4. L'image devra être entouré par un lien hypertexte vers Google Mapas: http://maps.google.com/maps?q=Paris


