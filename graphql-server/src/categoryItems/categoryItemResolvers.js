'use strict'

const resolvers = {
    Mutation: {
        editCategoryItem: async (_, { input }, { dataSources }) => {
           const { parentId, title } = input
           console.log("got here", parentId, title, input);
           return (await dataSources.categoryItemsAPI.editCategoryItem(parentId, title)).value;
        }
    }
}

module.exports = resolvers;