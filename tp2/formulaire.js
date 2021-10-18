function validation() {
    event.preventDefault()

    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var ddn = document.getElementById("ddn").value;
    var adress = document.getElementById("adress").value;
    var mail = document.getElementById("mail").value;

    var error;

    document.getElementById("error").innerHTML = "";
    document.getElementById("resultat").innerHTML = "";
    document.getElementById("resultat").style.display = "block";
    document.getElementById("error").style.display = "block";


    var Conditions = [["nom", nom, 20], ["prenom", prenom, 20], ["adress", adress, 50], ["mail", mail, 30]]


    if (!nom || !prenom || !ddn || !adress || !mail) {

        error = "tous les champs doivent être rempli"
        document.getElementById("error").innerHTML = error;
        document.getElementById("resultat").style.display = "none";
        return;
    }

    else {

        for (item of Conditions) {

            if (item[1].length < 5 || item[0].length > item[2]) {

                error = "le " + item[0] + " doit être entre 5 et " + item[2] + " caractères"
                document.getElementById("error").innerHTML = error;
                document.getElementById("resultat").style.display = "none";
                return;

            }

            if (item[0] === "mail" && !mail.includes("@")) {

                error = "l'email doit respecter le format et contenir l'@ "
                document.getElementById("error").innerHTML = error;
                document.getElementById("resultat").style.display = "none";
                return;
            }

        }
    }

    document.getElementById("error").innerHTML = "";
    document.getElementById("resultat").innerHTML = "bienvenue "+prenom;
    document.getElementById("error").style.display = "none";
}
