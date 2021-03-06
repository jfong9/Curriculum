'use strict'

const rootDefs = require('./shared/rootSchema');
const userDefs = require('./user/userSchema');
const currDefs = require('./curriculum/curriculumSchema');
const catDefs = require('./categories/categorySchema');
const itemDefs = require('./categoryItems/categoryItemSchema');
const studentCurrDefs = require('./studentCurrentCurriculum/studentCurrCurricSchema');

const typeDefs = [
    rootDefs, 
    userDefs, 
    currDefs,
    catDefs, 
    itemDefs, 
    studentCurrDefs,
]

module.exports = typeDefs;