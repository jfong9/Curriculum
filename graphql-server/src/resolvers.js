'use strict'


const testResolvers = require('./test/accountResolvers')
const resolverCommonTypes = require('./shared/resolverCommonTypes')
const currResolvers = require('./curriculum/curriculumResolvers')
const catResolvers = require('./categories/categoryResolvers')
const categoryItemResolvers = require('./categoryItems/categoryItemResolvers')
const studentCurrCurrResolvers = require('./studentCurrentCurriculum/studentCurrCurricResolvers')

const resolvers = [ 
    resolverCommonTypes, 
    currResolvers, 
    testResolvers, 
    catResolvers, 
    categoryItemResolvers,
    studentCurrCurrResolvers,
];

module.exports = resolvers;