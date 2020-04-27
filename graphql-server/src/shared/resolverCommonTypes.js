'use strict'

const { ObjectId } = require('bson');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language')

const MongoObjectIdType = new GraphQLScalarType({
    name: 'MongoObjectId',
    description: 'MongoDb ObjectId type',
    serialize(value) {
        return value.toHexString();
    }, 

    parseValue(value) {
        console.log(value)
        return new ObjectId(value)//value.toString();        
    },

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new ObjectId(ast.value)
        }
        return null;
    }
})

const resolverCommonTypes = {
    MongoObjectId: MongoObjectIdType
} 

module.exports = resolverCommonTypes;

