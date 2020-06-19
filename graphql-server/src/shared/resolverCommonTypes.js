'use strict'

const { ObjectId } = require('bson');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language')

const MongoObjectIdType = new GraphQLScalarType({
    name: 'MongoObjectId',
    description: 'MongoDb ObjectId type',
    serialize(value) {
        //outgoing to client
        console.log("serialize", value, typeof value)
        return new ObjectId(value);
    }, 

    parseValue(value) {
        //incoming from client
        console.log("parseValue", value, typeof value)
        return new ObjectId(value);        
    },

    parseLiteral(ast) {
        console.log("parseLiteral", ast.kind, Kind.STRING);
        if (ast.kind === Kind.STRING) {
            console.log("converting", ast.value)
            return new ObjectId(ast.value)
        }
        return null;
    }
})

const resolverCommonTypes = {
    MongoObjectId: MongoObjectIdType
} 

module.exports = resolverCommonTypes;

