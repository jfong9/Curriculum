'use strict'

const resolvers = {
    Mutation: {
        editCategoryItem: async (_, { input }, { dataSources }) => {
           const { id, title } = input
           console.log("got here", id, title, input);
           return (await dataSources.categoryItemsAPI.editCategoryItem(id, title)).value;
        }
    }
}

module.exports = resolvers;