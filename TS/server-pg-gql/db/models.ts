// import { User } from 'payment-typescript/payment';
import { DataTypes } from 'sequelize';
import { db } from '../app';


console.log('***********************************')
console.log(db)

export function dbCreateTables(): void {
    const ProductModel = db.define('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    const UserModel = db.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bankAccountId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    const BankDetailsModel = db.define('bankDetails', {
        accountId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cashBalance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        creditBalance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    UserModel.belongsTo(BankDetailsModel, { foreignKey: 'bankAccountId' });

    db.sync({ alter: true }).then(() => {
        console.log('Database & tables created!');
    });
}