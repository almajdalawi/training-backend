// import { buildSchema } from 'graphql'
import { gql } from "apollo-server-express"
import { IResolvers } from "../shared/interfaces"
import { ProductHandler } from "../controler/ProductHandler"


// export const schema = buildSchema(`
export const productsSchema = gql`
type Product {
    name: String!
    price: Int!
}

type Query {
    getProducts: [Product]
}

type Mutation {
    createProduct(name: String!, price: Int!): [Product]
    deleteProduct(name: String!): [Product]
    updateProduct(name: String!, price: Int!): [Product]
}
`
// )

export const productsResolvers: IResolvers = {
    Query: {       // added only for Apollo
        getProducts: new ProductHandler().get,
    },

    Mutation: {    // added only for Apollo
        createProduct: new ProductHandler().post,
        deleteProduct: new ProductHandler().delete,
        updateProduct: new ProductHandler().patch,
    }
}
