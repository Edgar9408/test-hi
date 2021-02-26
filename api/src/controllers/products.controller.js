import Product from "../models/Products";
import fetch from "node-fetch";

export async function getProducts(req, res, next) {
    try {
        let products = await Product.findAll();
        res.json({
            data: products
        })
    } catch (error) {
        next(error)
    }
}
async function changePrice(price){
    await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR')
                .then(response => response.json())
                .then(data => price=price*data.rates.EUR)
    return price
}
export async function createProduct(req, res, next) {
    let { img, name, description, price, typemoney, userid } = req.body
    try {
        if (typemoney == "USD") {
            let newprice =await changePrice(price)
            price=newprice
            typemoney="EUR"
        }
        let newProduct = await Product.create({
            img,
            name,
            description,
            price,
            typemoney,
            userid
        }, {
            fields: ['img', 'name', 'description', 'price', "typemoney", 'userid']
        });
        if (newProduct) {
            return res.json({
                message: "Product Created",
                data: newProduct
            })
        }
    } catch (error) {
        next(error)
    }
}

export async function getOneProduct(req, res, next) {
    const { id } = req.params;
    try {
        let product = await Product.findOne({
            where: {
                id
            }
        })
        res.json({
            data: product
        })
    } catch (error) {
        next(error)
    }
}
export async function deleteProduct(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
        let deleted = await Product.destroy({
            where: {
                id
            }
        })
        res.json({
            message: `se ha eliminado ${deleted} producto`
        })
    } catch (error) {
        next(error)
    }
}
export async function updateProduct(req, res, next) {
    let { id } = req.params;
    const { img,name, description, price, typemoney, userid } = req.body
    try {
        let product = await Product.findOne({
            where: {
                id
            }
        }).then(async u => {
            await u.update({
                img,
                name,
                description,
                price,
                typemoney,
                userid
            })
        })
        return res.json({
            message: "Producto actualizado",
            data: product
        })
    } catch (error) {
        next(error)
    }
}
export async function getProductByUser(req, res, next) {
    let { id } = req.params;
    try {
        let products = await Product.findAll({
            where: {
                userid: id
            }
        })
        res.json({ products });
    } catch (error) {
        next(error)
    }
}
