// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { BankDetailsHandler } from "../controler/BankDetailsHandler"
import { IResolvers } from "../shared/interfaces"


// export const schema = buildSchema(`
export const bankDetailsSchema = gql`
type BankAccount {
    accountId: Int!
    cashBalance: Int!
    creditBalance: Int!
}

type Query {
    getBankDetails(username: String!): BankAccount
}
`
// )

export const bankDetailsResolvers: IResolvers = {
    Query: {       // added only for Apollo
        getBankDetails: new BankDetailsHandler().get
    },

}
