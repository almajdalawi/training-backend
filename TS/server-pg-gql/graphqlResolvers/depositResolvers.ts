// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { DepositHandler } from "../controler/DepositHandler"
import { IResolvers } from "../shared/interfaces"


// export const schema = buildSchema(`
export const depositSchema = gql`
type BankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type Mutation {
    deposit(username: String!, amount: Int!, type: String!): BankAccount
}
`
// )

export const depositResolvers: IResolvers = {
    Mutation: {    // added only for Apollo
        deposit: new DepositHandler().post,
    }
}
