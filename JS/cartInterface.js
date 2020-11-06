export class CartInterface {

    static choiceOfOptions(teddy) {
        let choiceElt = document.createElement('div');
        choiceElt.innerHTML = `<h3>Vous souhaitez commander cet ourson?</h3>
                <button id="btn_choice">Choisissez la couleur ainsi que la quantité désirée en appuyant ici</button>
                <form id="sheet__form">
                <label for="color_select">Choix de la couleur</label><br>
                <select id="color_select" required>
                <option value=""> - Couleur - </option></select><br><br>
                <label for="color_select">Choix de la Quantité</label><br>
                <select id="quantity_select" required>
                <option value=""> - Quantité - </option></select>
                <button id="add__to__cart" class="product__add__to__cart"> <strong> Ajouter au panier</strong></button>
                </form>`
        return choiceElt
    }

    static createCartRecapElt(cart) {
        let storedTeddies = cart.getAllItems();
        const container = document.createElement('div');
        container.className = 'teddy_ref';

        const teddyDivCart = document.createElement('div');
        container.appendChild(teddyDivCart);
        teddyDivCart.className = 'teddy_cart';

        if (storedTeddies.length === 0) {
            const emptyCart = document.createElement('p');
            container.appendChild(emptyCart);
            emptyCart.className = "empty_cart";
            emptyCart.textContent = "Votre panier est vide pour le moment."

            return container;
        }

        storedTeddies.forEach(elt => {
            container.appendChild(CartInterface.createItemEntry(elt));
        });

        return container;
    }

    static createItemEntry(storedTeddy) {
        const eachTeddy = document.createElement('div');
        const teddyDivCart = document.createElement('div');
        teddyDivCart.appendChild(eachTeddy);
        eachTeddy.className = 'each_teddy';

        const teddiesCart = document.createElement('p');
        eachTeddy.appendChild(teddiesCart);
        teddiesCart.textContent = storedTeddy.qty + " " + storedTeddy.name + " , " + storedTeddy.color + " , " + storedTeddy.price + " €";

        const teddyPrice = document.createElement('div');
        let i = 0;
        eachTeddy.appendChild(teddyPrice);
        teddyPrice.className = 'teddy_price';
        teddyPrice.id = i++;

        const price = document.createElement('p');
        teddyPrice.appendChild(price);
        price.textContent = storedTeddy.price * storedTeddy.qty + " €"

        // création bouton suppression d'un teddy
        const garbageButton = document.createElement('button');
        teddyPrice.appendChild(garbageButton);
        garbageButton.className = 'garbage_button';
        garbageButton.title = 'Supprimer cet article ?';

        garbageButton.addEventListener('click', function (event) {
            event.preventDefault();
            let id = this.closest('.teddy_price').id;
            let storedTeddies = JSON.parse(localStorage.getItem('cart'));

            //on supprime l'article du localStorage
            storedTeddies.splice(id, 1);

            //on enregistre le nouveau localStorage
            localStorage.setItem('cart', JSON.stringify(storedTeddies));
            JSON.parse(localStorage.getItem('cart'));

            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html";
        })

        const iconButton = document.createElement('i');
        garbageButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt';

        return eachTeddy;
    }

    static deleteAll() {
        const garbage = document.createElement('button');
        const teddyDivCart = document.createElement('div');
        teddyDivCart.appendChild(garbage);
        garbage.className = 'delete_cart';

        const cartLink = document.createElement('a');
        garbage.appendChild(cartLink);
        cartLink.href = "panier.html";
        cartLink.id = "cart_link"
        cartLink.title = 'Vider le panier';
        cartLink.textContent = "Vider mon panier ";

        const icon = document.createElement('i');
        cartLink.appendChild(icon);
        icon.className = 'fas fa-trash-alt'

        garbage.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.clear()
            alert('Votre panier a bien été vidé !')
            window.location.href = "panier.html";
        });
        return garbage
    }

    static totalPrice(cart) {
        const totalElt = document.createElement('p');

        const teddyDivCart = document.createElement('div');
        teddyDivCart.appendChild(totalElt);
        totalElt.className = 'total';
        totalElt.textContent = "Montant total = " + cart.getTotalPrice() + " €";

        return totalElt
    }
    
}