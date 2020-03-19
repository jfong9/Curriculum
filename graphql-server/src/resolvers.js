'use strict'

const resolvers = {
    Query: {
        sensitiveInformation: () => 'Sensitive Info',
    },
}

module.exports = resolvers;