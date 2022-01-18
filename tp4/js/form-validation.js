window.onload = function () {

    function NotEmpty(inputs) {
        for (input of inputs) {
            if (!input) return false
        }
        return true
    }


    function lessThan(inputs) {

        for (input of inputs) {
            if (input.length < 5) return true
        }
        return false
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    function valideDDN(input) {

        ddn = new Date(input)
        let diff = Date.now() - ddn.getTime();

        if (Math.sign(diff) != 1) {
            return false
        }
        else return true
    }

    function validation(inputs) {

        if (!NotEmpty(inputs)) return "all the input should not be empty"
        if (lessThan(inputs)) return "all elements need to be more than 5 charac"
        if (!validateEmail(inputs[4])) return "none valide mail"
        if (!valideDDN(inputs[2])) return "you are born in the future wow !!"

        return true

    }

    document.getElementById("FormButton").addEventListener("click", function () {

        event.preventDefault()
        // empty all the html css of the modal
        document.getElementById("errorModal").innerHTML = ""
        document.getElementById("myModalLabel").innerHTML = ""
        document.getElementById("textModal").innerHTML = ""
        document.getElementById("imgModal").setAttribute("src", "")
        document.getElementById("imgModal").setAttribute("alt", "")
        document.getElementById("linkModal").innerHTML = ""
        document.getElementById("linkModal").setAttribute("href", "")


        // get inputs' value
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;
        var ddn = document.getElementById("ddn").value;
        var adress = document.getElementById("adress").value;
        var mail = document.getElementById("mail").value;

        // get the modal by ID
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));

        // validate the form
        let res = validation([nom, prenom, ddn, adress, mail])

        if (res == true) {

            contactStore.add(nom, prenom, ddn, adress, mail);
            contactList = contactStore.getList()

            document.querySelector("table tbody").innerHTML = ""
          
            for (var index in contactList) {
                document.querySelector("table tbody").innerHTML =
                document.querySelector("table tbody").innerHTML +
                "<tr><td>" +
                contactList[index].name +
                "</td><td>" +
                contactList[index].firstname +
                "</td><td>" +
                contactList[index].date +
                "</td><td>"+
                contactList[index].adress +
                "</td><td>"+
                contactList[index].mail +
                "</td><td>"
              }
              document.querySelector("form").reset();

        }
        else {
            document.getElementById("myModalLabel").innerHTML = "Error !!"
            document.getElementById("errorModal").innerHTML = res

            //show the modal 
            myModal.show();

        }
    });

    document.getElementById("locationButton").addEventListener("click", function () {
      //  event.preventDefault()
        var location = getLocation()
        console.log(location);
    })
};

