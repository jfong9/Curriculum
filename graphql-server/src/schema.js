'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		#This query will be protected so only authenticated users can access it
		sensitiveInformation: String @auth
        regularInfo: String
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