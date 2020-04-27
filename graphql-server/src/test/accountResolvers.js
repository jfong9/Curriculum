'use strict'

const resolvers = {
    Query: {
        sensitiveInformation: () => 'Sensitive Info',
        regularInformation: () => 'Regular Info'
    },
}

module.exports = resolvers;