function getIdFromUrl() { 

    let searchParams = new URLSearchParams(location.search);
    return searchParams.get('id');
}

function displayTeddy(url) { // Fonction qui vient récupérer les informations de nos produits.
    retrieveContent(url).then(response => {
        let teddy = new Teddy(response) //Instanciation de notre classe teddy.

        document.getElementById('description').appendChild(TeddyInterface.displayDetails(teddy));
        document.getElementById('choix').appendChild(CartInterface.choiceOfOptions(teddy));
 
        let colorSelectElt = updateColorSelectorElt(teddy.colors, 'color_select');
        let quantitySelectElt = updateQuantitySelectorElt('quantity_select');

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

function affiche() {
    if (document.getElementById('btn_choice').innerHTML == 'Choisissez la couleur ainsi que la quantité désirée en appuyant ici') {
        document.getElementById('btn_choice').innerHTML = 'Selectionnez à présent vos options';
        document.getElementById('sheet__form').style.display = 'block';
    } else {
        document.getElementById('btn_choice').innerHTML == 'Choisissez la couleur ainsi que la quantité désirée en appuyant ici';
        document.getElementById('sheet__form').style.display = 'none';
    }
};

const id = getIdFromUrl();
let url = `http://localhost:3000/api/teddies/${id}`;
const cart = new Cart();

displayTeddy(url);