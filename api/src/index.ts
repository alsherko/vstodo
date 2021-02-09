import express from 'express';
import { join } from 'path';
import {createConnection} from 'typeorm'
import { __prod__ } from './constants';
import {User} from "./entities/User";

require('dotenv').config();

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        entities: [join(__dirname, './entities/*.*')],
        logging: !__prod__,
        synchronize: !__prod__,

    })
    
    const user = await User.create({name: 'bob'}).save();

    console.log({user})

    const app = express()
    app.get('/', (_req, res) => {
        res.send("hello");
    })
    app.listen(3003, () => {
        console.log('listening on localhost:3002')
    })
};

main();
