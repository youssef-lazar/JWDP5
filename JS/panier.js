import { Validator } from "./Validator.js";
import {Cart} from "./Cart.js";
import {CartInterface} from "./CartInterface.js";


function postForm(data) { // Fonction Post qui va nous servir à envoyer les données à l'API.
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/teddies/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status == 201) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                resolve(response);
            }
        }
    })
};

const cartRecap = new Cart();
document.getElementById('list_teddies').appendChild(CartInterface.createCartRecapElt(cartRecap));
document.getElementById('list_teddies').appendChild(CartInterface.deleteAll(cartRecap));
document.getElementById('list_teddies').appendChild(CartInterface.totalPrice(cartRecap));

// envoie des données panier + contact au serveur si le formulaire est valide
document.getElementById('form1').addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = formIsValid(form1);
    if (errors.length > 0) {
        alert(errors);

    } else {
        //Création de l'objet "contact"

        let contact = {
            lastName: form1.lastName.value,
            firstName: form1.firstName.value,
            email: form1.email.value,
            phone: form1.phone.value,
            address: form1.address.value,
            zipcode: form1.zip.value,
            city: form1.city.value,
            country: form1.country.value
        }

        // création d'un objet regroupant contact et produits
        let data = {
            contact: contact,
            products: cartRecap.getAllItemsIds(),
        }


        postForm(data).then(function (response) { //Envoi de nos données avec la fonction Post.
            location.href = "order.html";
            response.totalPrice = cartRecap.getTotalPrice();
            let myOrder = JSON.stringify(response);
            sessionStorage.setItem("myOrder", myOrder);
            localStorage.clear(); // stockage de la réponse du serveur dans notre local storage.
        });
    }

});

function formIsValid(form) {
    let errors = [];

    if (!Validator.isValid(form.firstName.value)) {
        errors.push("Le prénom ne doit contenir ni chiffre ni symbole.  ");
    }
    if (!Validator.isValid(form.lastName.value)) {
        errors.push("Le nom ne doit contenir ni chiffre ni symbole.  ");
    }
    if (!Validator.validAdress(form.address.value)) {
        errors.push("L'adresse ne doit contenir aucun symbole.  ")
    }
    if (!Validator.isValid(form.city.value)) {
        errors.push("La ville ne doit contenir ni chiffre ni symbole.  ")
    }
    if (!Validator.validMail(form.email.value)) {
        errors.push("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).  ")
    }
    if (!Validator.validPhone(form.phone.value)) {
        errors.push("Le numéro de téléphone ne doit contenir que des chiffres.  ")
    }
    if (!Validator.validZip(form.zip.value)) {
        errors.push("Le code postal doit contenir 5 chiffres.  ")
    }
    if (!Validator.isValid(form.country.value)) {
        errors.push("Le pays ne doit contenir ni chiffre ni symbole.   ")
    }
    return errors;
}