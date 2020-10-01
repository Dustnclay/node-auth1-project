const db = require('../connection')

module.exports = {
    find,
    findBy,
    add,
    findById
}

function find() {
    return db('users').orderBy("id")
}

function findBy (filter) {
    console.log(filter)
    return db('users');
}

async function add (user) {
    try{
        const [id] = await db('users').insert(user,'id')
        // console.log('added success')
        return findById(id);
    }catch(error){
        throw error;
    }
}

function findById(id) {
    return db('users')
}