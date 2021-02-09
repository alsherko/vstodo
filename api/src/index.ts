import express from 'express';

const main = async () => {
    const app = express()
    app.get('/', (_req, res) => {
        res.send("hello");
    })
    app.listen(3002, () => {
        console.log('listerning on localhost:3002')
    })
};

main();
