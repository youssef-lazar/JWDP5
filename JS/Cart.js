class Cart { // création de la classe Panier
    constructor(id = "cart") {
        this.storage = JSON.parse(localStorage.getItem(id)) || []; //initialisation de notre variable storage = tableau contenant notre localstorage 'cart' ou vide si pas encore d'éléments dans le localstorage.
    }

    ajouter = (item) => {
        let article = this.storage.find(teddy => teddy.id === item.id && teddy.colors === item.color); //initialisation de notre variable article => on va chercher une correspondance au niveau de l'id et des couleurs.
        if (article !== undefined) { // si l'article est déjà existant, alors on vient ajouter les quantités.
            article.qte += item.qte
        } else { // sinon on le push dans notre tableau storage.
            this.storage.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(this.storage)); // et on set notre localstorage avec les éléments présents dans notre tableau
    }
}