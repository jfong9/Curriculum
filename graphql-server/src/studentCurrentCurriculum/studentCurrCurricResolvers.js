'use strict'

const resolvers = {
    Query: {
        getStudentCurrCurric:  async (_, { input }, { dataSources } ) => {
            const { studentId, art} = input;
            return await dataSources.studentCurrCurricAPI.getStudentCurric(studentId, art);
        },

        getStudentCurrCurricById: async (_, { input }, { dataSources } ) => {
            return await dataSources.studentCurrCurricAPI.getStudentCurrCurricById(input);
        }
    },
    Mutation: {
        addTopCurrElements: async (_, { input }, { dataSources } ) => {
            const { categoryId, studentCurrInput: { studentId, art}} = input;
            let categories = await dataSources.categoryAPI.getCurrCategoryElements( categoryId );

            //go through and get all the categoryItem Ids from the available categories.
            let itemIds = [].concat(...categories.map(cat => cat.currentItems))
            //the following reduce works but i think it has to reiterate over each of the outputs which isn't efficient
            //cats.reduce( (output, category) => [...output, ...category.currentItems], [])
            let currentIds = categories.map( cat => cat._id);
            let topCatId = currentIds.shift();
            let studentCurric = await dataSources.studentCurrCurricAPI.getStudentCurric(studentId, art);
            let studentIds = new Set([
                    ...studentCurric.topCategories.map( obj => obj.id.toString()),
                    ...studentCurric.currentCategories.map( obj => obj.id.toString()),
                    ...studentCurric.hiddenCategories.map(obj => obj.id.toString()),
                    ...studentCurric.currentItems.map(obj => obj.id.toString()),
                    ...studentCurric.hiddenItems.map(obj => obj.id.toString())
                ]);

            let studentTopCat;
            if (!studentIds.has(topCatId.toString())) studentTopCat = {id: topCatId, status: ""};
            let studentCategories = currentIds.filter( id => !studentIds.has(id.toString())).map(id => {return {id: id, status: ""}})
            let studentItems = itemIds.filter( id => !studentIds.has(id.toString())).map(id => {return {id: id, status: ""}})

            //workout which ids are already in this curriculum object.
            //how will this work when transferring over to archives?
            //maybe check if the top exists, and if it does don't do anything?
            await dataSources.studentCurrCurricAPI.addTopCurrElements(studentId, art, studentTopCat, studentCategories, studentItems);
            let result = await dataSources.studentCurrCurricAPI.getStudentCurric(studentId, art);
            return result;
        },

        clearCurrCurric: async (_, { input }, { dataSources }) => {
            const { studentId, art} = input;
            await dataSources.studentCurrCurricAPI.clearCurrCurric(studentId, art);
            let result = await dataSources.studentCurrCurricAPI.getStudentCurric(studentId, art);
            return result;

        },

        updateStatus: async (_, { input }, { dataSources }) => {
            const { id, categoryId, collection, status} = input;
            await dataSources.studentCurrCurricAPI.updateStatus(id, categoryId, collection, status)
            return await dataSources.studentCurrCurricAPI.getStudentCurrCurricById(id);
        }


    }
}

module.exports = resolvers;