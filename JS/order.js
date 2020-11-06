const myOrder = JSON.parse(sessionStorage.getItem("myOrder")); // Récupération de notre local storage.

let section = document.getElementById('order_confirmation');
let div = document.createElement('div');
div.innerHTML =
    '<h3>Merci pour votre commande!</h3>' +
    '<p>Voici votre numéro de commande : <span id="orderId">' + myOrder.orderId + '</span></p>' +
    '<p>Nous préparons votre commande. Vous pourrez suivre votre commande avec ce numéro.</p><br>' +
    '<p>Total payé : <span class="totalPayed">' + myOrder.totalPrice + ' €</span></p>'
section.appendChild(div);