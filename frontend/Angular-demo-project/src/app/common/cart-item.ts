import { Product } from "./product";

export class CartItem {

    id!: number;
    name!: string;
    imageUrl!: string;
    unitPrice!: number;
    quantity!: number;

    constructor(product:Product){
        this.id = product.id;
        this.unitPrice = product.unitPrice;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.quantity = 1;

    }
}
