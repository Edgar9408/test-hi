import Sequelize from "sequelize"
import { sequelize } from "../database/database"
import Product from './products'

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, { timestamps: false });
User.hasMany(Product, { foreinKey: 'userid', sourceKey: 'id' })
Product.belongsTo(User, { foreinKey: 'userid', sourceKey: 'id' })

export default User;    
