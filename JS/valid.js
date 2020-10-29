// création fonctions de validité prénom, nom, ville, pays
function isValid(value) {
    return /^[A-Z-a-z\s]{3,40}$/.test(value);
};

// création fonctions de validité adresse
function validAdress(value) {
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
};

// création fonctions de validité mail
function validMail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};

function validPhone(value) {
    return /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-./]*\(*[2-9]\d{2}\)*[-./]*\d{3}[-./]*\d{4}*e*x*t*\.**\d{0,4}$/.test(value)
};

function validZip(value) {
    return /^[0-9]{5,5}$/.test(value)
};


form1.addEventListener("submit", function (event) {
    if (isValid(form1.firstName.value)) {} else {
        alert("Le prénom ne doit contenir ni chiffre ni symbole.")
        event.preventDefault()
    }
    if (isValid(form1.lastName.value)) {} else {
        alert("Le nom ne doit contenir ni chiffre ni symbole.")
        event.preventDefault()
    }
    if (validAdress(form1.address.value)) {} else {
        event.preventDefault()
        alert("L'adresse ne doit contenir aucun symbole.")
    }
    if (isValid(form1.city.value)) {} else {
        alert("La ville ne doit contenir ni chiffre ni symbole.")
        event.preventDefault()
    }
    if (validMail(form1.email.value)) {} else {
        event.preventDefault()
        alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).")
    }
    if (validPhone(form1.phone.value)) {} else {
        alert("Le numéro de téléphone ne doit contenir que des chiffres.")
        event.preventDefault()
    }
    if (validZip(form1.zip.value)) {} else {
        alert("Le code postal ne doit contenir que des chiffres.")
        event.preventDefault()
    }
    if (isValid(form1.country.value)) {} else {
        alert("Le pays ne doit contenir ni chiffre ni symbole.")
        event.preventDefault()
    }
});

/* Vérification de la validité du prénom
form1.firstName.addEventListener("change", function (event) {
    if (isValid(form1.firstName.value)) {} else {
        alert("Aucun chiffre ou symbole n'est autorisé.")
        event.preventDefault()
    }
});
*/