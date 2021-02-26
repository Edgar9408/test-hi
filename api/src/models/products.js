import Sequelize from 'sequelize'
import { sequelize } from '../database/database'

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    img: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    typemoney: {
        type: Sequelize.ENUM("USD", "EUR"),
        allowNull: false
    },
    userid: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false });

export default Product;