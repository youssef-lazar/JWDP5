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

    // envoie du prix total au localStorage

    let storagePrice = localStorage.getItem('totalPrice');
    console.log(storagePrice);

    //Création de l'objet "contact"
    // let contact = new Contact(form1)
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
        total: storagePrice
    }


    postForm(data).then(function (response) { //Envoi de nos données avec la fonction Post.
        location.href = "order.html";
        let myOrder = JSON.stringify(response);
        sessionStorage.setItem("myOrder", myOrder);
        localStorage.clear(); // stockage de la réponse du serveur dans notre local storage.
    });

});