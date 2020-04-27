'use strict'

const { gql } = require('apollo-server');

//There is no matching userResolver as it is built into the accountsjs framework


const typeDefs = gql`
	extend type Query {
		#This query will be protected so only authenticated users can access it
		sensitiveInformation: String @auth 
        regularInformation: String
	}

    extend type User {
        schools: [UserSchool]
    }
    
    type UserSchool{
        username: String
        type: String
    }
`;

module.exports = typeDefs;