const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const restricted = require('./data/auth/restricted-middleware')

const userRouter = require('./data/users/userRouter')
const authRouter = require('./data/auth/auth-router')

const sessionConfig = {
    name: 'dtsession',
    secret: 'thisisthesecret',
    cookie: {
        maxAge:36000,
        secure:false,
        httpOnly: true
    },
    resave:false,
    saveUninitialized:false,

    store: new knexSessionStore(
        {
            knex: require('./data/connection'),
            tablename: 'sessions',
            sidfieldname:'sid',
            createtable:true,
            clearInterval: 36000
        }
    )
}

server.use(helmet());
server.use(express.json());
server.use(cors()); 

server.use(session(sessionConfig));
 
server.use('/api/auth', authRouter)
server.use('/api/users',restricted,userRouter)

server.get('/', (req,res) => {
    res.json({ api:'up'});
});

module.exports = server;