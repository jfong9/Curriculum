'use strict'


const testResolvers = require('./test/accountResolvers')
const resolverCommonTypes = require('./shared/resolverCommonTypes')
const currResolvers = require('./curriculum/curriculumResolvers')
const catResolvers = require('./categories/categoryResolvers')

const resolvers = [resolverCommonTypes, currResolvers, testResolvers, catResolvers]

module.exports = resolvers;