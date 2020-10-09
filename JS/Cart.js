class Cart { // création de la classe Panier
    constructor(id = "cart") {
        this.id = id;
        this.storage = JSON.parse(localStorage.getItem(id)) || []; //initialisation de notre variable storage = tableau contenant notre localstorage 'cart' ou vide si pas encore d'éléments dans le localstorage.
    }

    getAllItems(){
        return this.storage;
    }

    ajouter = (item) => {

         //initialisation de notre variable article => on va chercher une correspondance au niveau de l'id et des couleurs.
        let filter   = this.storage.filter(teddy => teddy.id === item.id && teddy.color === item.color);



        if (filter.length === 1) { // si l'article est déjà existant, alors on vient ajouter les quantités.
            let storedItem = filter[0];
           storedItem.qty = Number(item.qty) + Number(storedItem.qty);
        } else if(filter.length === 0) { // sinon on le push dans notre tableau storage.
            this.storage.push(item);
        } else {
            throw new Error('Unique item already exist 2 times in storage');
        }
        localStorage.setItem(this.id, JSON.stringify(this.storage)); // et on set notre localstorage avec les éléments présents dans notre tableau
        return this.storage;
    }
}




const checkQty = () => { // Vérifie que la quantité ajoutée au panier soit valide
    let myQty = parseInt(document.getElementById("quantity_select").value)
    if (myQty > 0 && myQty < 100) {
        return myQty
        
    } else return parseInt(document.getElementById("quantity_select").value = 1)
}

//récupération données localStorage
let storedTeddies = JSON.parse(localStorage.getItem('cart'));
console.log(storedTeddies);