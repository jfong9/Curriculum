'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		#This query will be protected so only authenticated users can access it
		sensitiveInformation: String @auth
	}
`;

module.exports = typeDefs;