'use strict'

const resolvers = {
    Query: {
        sensitiveInformation: () => 'Sensitive Info',
        regularInfo: () => 'Regular Info'
    },
}

module.exports = resolvers;