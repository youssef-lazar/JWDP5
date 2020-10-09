function getIdFromUrl() { // Fonction qui vient récupérer l'ID de notre URL.
    // const params = location.search; // on vient récuperer le querystring de notre URL => la partie après le ?.
    //const id = params.split("id=")[1]; // on vient enlever "id" et retourner la string qui suit donc l'id.
    //return id;

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
                id: teddy._id,
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

function getDetailsOfProductsToAdd() { // Fonction qui récupère les élements qu'on store dans notre local storage.
    const color = document.getElementById("color_select");
    const qte = document.getElementById("quantity_select");
    const id = document.getElementById("photo");
    const dataId = id.getAttribute('data-id');
    return {
        "id": dataId,
        "qte": parseInt(qte.value),
        "color": color.value,
    }
}


const id = getIdFromUrl();
let url = `http://localhost:3000/api/teddies/${id}`;
const cart = new Cart();



displayTeddy(url);