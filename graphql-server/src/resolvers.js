'use strict'
const resolvers = {
    Query: {
        sensitiveInformation: () => 'Sensitive Info',
        me: (_, __, ctx) => {
            if (ctx.userId) {
                let ret = accountsServer.findUserById(ctx.userId);
                if (!ret.schools)
                    ret.schools = [];
                console.log(ctx.userId, ret);
                return ret;
            }
            return null;
        }
    },
}

module.exports = resolvers;