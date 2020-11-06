export class Teddy { // création de la classe teddy
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.price = data.price;
        this.colors = data.colors;
        this.description = data.description;
        this.image = data.imageUrl;
    }
}