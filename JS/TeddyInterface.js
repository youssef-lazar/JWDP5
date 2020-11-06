export class TeddyInterface { // création de la classe teddy

    static displayInList(teddy) {
        let card = document.createElement('div');
        card.innerHTML = `<div class="card"><img class="details product__photos" data-id="${teddy.id}" src="${teddy.image}" alt="${teddy.name}">
                <h3 class="details teddy__name" data-id="${teddy.id}">${teddy.name}</h3>
                <button class="details product__details btn" data-id="${teddy.id}" > Voir le produit </button></div > `;

        return card;
    }

    static displayDetails(teddy) {
        let detailElt = document.createElement('div');
        detailElt.innerHTML = `<img id="photo" class="product__photos" data-id="${teddy.id}" src="${teddy.image}" alt="product photo">
                <h3 id="teddy__name">${teddy.name}</h3>
                <p class="product__description"> <strong> Description : ${teddy.description}</strong></p>
                <p id="price" class="product__price"> <strong> Prix : ${teddy.price/100},00 €</strong></p>`;
        return detailElt;
    }
}