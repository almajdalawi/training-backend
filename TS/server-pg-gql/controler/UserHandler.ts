import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser } from '../shared/interfaces'
import { User } from '../../payment-typescript/payment'
import { Model } from 'sequelize';



export class UserHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any): Promise<Model<any, any>[]> {
        return db.models.users.findAll()
    }

    async post(_: any, { name }: { name: string }): Promise<Model<any, any>[]> {
        let newUser: Omit<IUser, "id"> = new User(name)
        db.models.users.create(newUser)

        return db.models.users.findAll()
    }

    async delete(_: any, { name }: { name: string }): Promise<Model<any, any>[]> {
        let userIndex = await db.models.users.findOne({ where: { name: name } })
        if (!userIndex) { throw new GraphQLError('User not found') }
        db.models.users.destroy({ where: { name: name } })

        return db.models.users.findAll()
    }


    patch(): void { }
}
