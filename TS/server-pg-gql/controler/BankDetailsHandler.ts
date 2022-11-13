import { GraphQLError } from 'graphql';
import { BaseHandler } from './BaseHandler'
import { db } from '../app'
import { IUser, IBank } from '../shared/interfaces'
import { Model } from 'sequelize';



export class BankDetailsHandler extends BaseHandler {
    constructor() {
        super()
    }

    async get(_: any, { username }: { username: string }): Promise<Model<any, any>> {
        let theUser: Model<any, any> | null = await db.models.users.findOne({ where: { name: username } })
        if (!theUser) { throw new GraphQLError('User not found') }

        return theUser
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}
