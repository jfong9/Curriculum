'use strict'

const rootDefs = require('./shared/rootSchema')
const userDefs = require('./user/userSchema');
const currDefs = require('./curriculum/curriculumSchema')
const catDefs = require('./categories/categorySchema')

const typeDefs = [rootDefs, userDefs, currDefs, catDefs]

module.exports = typeDefs;