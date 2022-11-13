import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser, IProduct, IBank } from '../shared/interfaces'
import { Model } from 'sequelize';



export class PurchaseHandler extends BaseHandler {
    constructor() {
        super()
    }

    async post(_: any, { username, productName, type }: { username: string, productName: string, type: string }): Promise<Model<any, any>> {
        let theUser: Model<any, any> | null = await db.models.users.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }
        let theProduct: Model<any, any> | null = await db.models.products.findOne({ where: { name: productName } })
        if (!theProduct) { throw new GraphQLError('Product not found') }

        if (type != 'cash' && type != 'credit') { throw new GraphQLError('Invalid payment type') }

        if (type == 'cash' && theProduct.price <= theUser.bankAccount.cashBalance) { theUser.bankAccount.cashBalance -= theProduct.price }
        else if (type == 'credit' && theProduct.price <= theUser.bankAccount.creditBalance) { theUser.bankAccount.creditBalance -= theProduct.price }
        else { throw new GraphQLError('Insuficient money') }

        return theUser
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
