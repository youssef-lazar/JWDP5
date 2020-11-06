import {retrieveContent} from "./Utils.js";
import {Teddy} from "./Teddy.js";
import {TeddyInterface} from "./TeddyInterface.js";
import {FormInterface} from "./FormInterface.js";
import {Cart} from "./Cart.js";
import {CartInterface} from "./CartInterface.js";


function getIdFromUrl() {

    let searchParams = new URLSearchParams(location.search);
    return searchParams.get('id');
}

function displayTeddy(url) { // Fonction qui vient récupérer les informations de nos produits.
    retrieveContent(url).then(response => {
        let teddy = new Teddy(response) //Instanciation de notre classe teddy.

        document.getElementById('description').appendChild(TeddyInterface.displayDetails(teddy));
        document.getElementById('choix').appendChild(CartInterface.choiceOfOptions(teddy));


        // Affichage choix de la couleur/quantité via un bouton
        let btnChoice = document.getElementById("btn_choice");
        let divChoice = document.getElementById("sheet__form");

        btnChoice.addEventListener("click", () => {
            if (getComputedStyle(divChoice).display != "none") {
                divChoice.style.display = "none";
            } else {
                divChoice.style.display = "block";
                btnChoice.innerHTML = 'Selectionnez à présent vos options';
            }
        })

        let colorSelectElt = FormInterface.updateColorSelectorElt(teddy.colors, 'color_select');
        let quantitySelectElt = FormInterface.updateQuantitySelectorElt('quantity_select');

        // récupérations données et envoie au panier
        const addTeddy = document.getElementById('add__to__cart'); // Ajout du bouton panier
        addTeddy.addEventListener("click", function (event) {
            event.preventDefault();

            // stockage des données du/des teddy souhaité dans localStorage
            let teddiesChoosen = {
                name: teddy.name,
                id: teddy.id,
                color: colorSelectElt.value,
                qty: quantitySelectElt.value,
                price: teddy.price / 100,
            };

            console.log(teddiesChoosen);
            let storedTeddies = cart.ajouter(teddiesChoosen);
            console.log(storedTeddies);
            if (window.confirm(teddiesChoosen.name + " " + teddiesChoosen.color + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
                window.location.href = "panier.html";
            } else {
                window.location.href = "index.html";
            }
        });
    })
}

const id = getIdFromUrl();
let url = `http://localhost:3000/api/teddies/${id}`;
const cart = new Cart();

displayTeddy(url);