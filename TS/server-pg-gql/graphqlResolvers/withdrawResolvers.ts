// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { IResolvers } from "../shared/interfaces"
import { WithdrawHandler } from "../controler/WithdrawHandler"


// export const schema = buildSchema(`
export const withdrawSchema = gql`
type BankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type Mutation {
    withdraw(username: String!, amount: Int!, type: String!): BankAccount
}
`
// )

export const withdrawResolvers: IResolvers = {
    Mutation: {    // added only for Apollo
        withdraw: new WithdrawHandler().post,
    }
}
