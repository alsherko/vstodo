require('dotenv').config();

import express from 'express';
import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github';
import {join} from 'path';
import {createConnection} from 'typeorm'
import jwt from 'jsonwebtoken';

import {User} from './entities/User';
import {__prod__} from './constants';

const main = async () => {
    await createConnection({
        type: 'postgres',
        // dropSchema: true,
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        entities: [join(__dirname, './entities/*.*')],
        logging: !__prod__,
        synchronize: !__prod__,

    })

    const app = express()

    passport.serializeUser((user: any, done) => {
        done(null, user.uccessToken)
    });
    app.use(passport.initialize())

    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3003/auth/github/callback",
        },
        async (_accessToken, _refreshToken, profile, cb) => {
            let user = await User.findOne({where: {githubId: profile.id}});

            if (user) {
                user.name = profile.displayName;
                await user.save();
            } else {
                user = await User.create({
                    name: profile.displayName,
                    githubId: profile.id,
                }).save();
            }
            cb(null, {accessToken: jwt.sign({userId: user.id}, process.env.JWT_KEY, {expiresIn: '1y'})})
        })
    );
    app.get('/auth/github',
        passport.authenticate('github', {session: false}));

    app.get('/auth/github/callback',
        passport.authenticate('github', {session: false}),
        (req: any, res) => {
            res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`)
        });

    app.get('/', (_req, res) => {
        res.send("hello");
    })
    app.listen(3003, () => {
        console.log('listening on localhost:3002')
    })
};

main();
