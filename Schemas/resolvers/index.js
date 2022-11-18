const pin = require('./pins');
const user = require('./users');

module.exports = { Query: { ...pin.Query, }, Mutation: { ...user.Mutation, ...pin.Mutation } };