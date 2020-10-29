function updateColorSelectorElt(colors, selectorId) {
    const select = document.getElementById(selectorId); // Ajout du menu de selection de la couleur.
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const option = select.appendChild(document.createElement("option"));
        option.setAttribute("value", color);
        option.textContent = color;
    }
    return select
}

function updateQuantitySelectorElt(selectorId) {
    const selectQuantity = document.getElementById(selectorId); // Ajout du menu de selection de la quantité.
    for (let i = 1; i <= 10; i++) {
        const option = selectQuantity.appendChild(document.createElement("option"));
        option.textContent = i;
    }
    return selectQuantity
}