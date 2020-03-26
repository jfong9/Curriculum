'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		#This query will be protected so only authenticated users can access it
        me: User
		sensitiveInformation: String @auth
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