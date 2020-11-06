export class Validator {


// création fonctions de validité prénom, nom, ville, pays
static  isValid(value) {
    return /^[A-Z-a-z\s]{3,40}$/.test(value);
}

// création fonctions de validité adresse
static  validAdress(value) {
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
}

// création fonctions de validité mail
static  validMail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

static validPhone(value) {
    return /^0[1-68](((\.[0-9]{2}){4})|((\-[0-9]{2}){4})|(([0-9]{2}){4}))$/.test(value)
};

static  validZip(value) {
    return /^[0-9]{5,5}$/.test(value)
}
}
