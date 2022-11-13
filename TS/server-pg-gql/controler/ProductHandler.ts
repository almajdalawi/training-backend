import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IProduct } from '../shared/interfaces'
import { Product } from '../../payment-typescript/payment'
import { Model } from 'sequelize';


export class ProductHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<Model<any, any>[]> {
        return db.models.products.findAll()
    }

    async post(_: any, { name, price }: { name: string, price: number }): Promise<Model<any, any>[]> {
        let newProduct: Omit<IProduct, "id"> = new Product(name, price)
        db.models.products.create(newProduct)

        return db.models.products.findAll()
    }

    async delete(_: any, { name }: { name: string }): Promise<Model<any, any>[]> {
        let productIndex = await db.models.products.findOne({ where: { name: name } })
        if (!productIndex) { throw new GraphQLError('Product not found') }
        db.models.products.destroy({ where: { name: name } })

        return db.models.products.findAll()
    }

    async patch(_: any, { name, price }: { name: string, price: number }): Promise<Model<any, any>[]> {
        let productIndex = await db.models.products.findOne({ where: { name: name } })
        if (!productIndex) { throw new GraphQLError('Product not found') }
        db.models.products.update({ price: price }, { where: { name: name } })

        return db.models.products.findAll()
    }
}
