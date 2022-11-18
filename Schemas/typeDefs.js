const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
}
type Description {
    username: String!
    body: String!
    rating: Int!
    publishedAt: String!
}
type Pin {
    id: ID!
    createdBy: String!
    title: String!
    desc: [Description]!
    lat: Float!
    long: Float!
}
input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
input DescriptionInput {
    body: String!
    rating: Int!
    publishedAt: String!
}
type Query {
    getPins: [Pin]
    getPin(pinId: ID!): Pin
}
type Mutation{
register(registerInput: RegisterInput): User!
login(username: String!, password: String!): User!
createPin(
    title: String!
    desc: DescriptionInput!
    lat: Float!
    long: Float!
): Pin!
deletePin(pinId: ID!): [Pin]
createDescription(pinId: ID!, desc: DescriptionInput!): [Pin]
}
`;