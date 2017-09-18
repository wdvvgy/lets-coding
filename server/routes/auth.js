import express from 'express';
import Auth from '../models/auth';
import authMiddleware from '../middleware/auth';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', (req, res) => {
    const { id, pw } = req.body.formData;

    const badInputCheck = () => new Promise((resolve, reject) => {
        if(typeof id !== 'string' || id.length < 4 || typeof pw !== 'string' || pw.length < 4) reject('Bad input');
        resolve();
    });

    const existCheck = () => new Promise((resolve, reject) => {
        Auth.findOne({id: id}, (err, exists) => {
            if(err) reject(err);
            console.log(exists);
            if(exists) reject('Already Exists');
            let auth = new Auth({ id: id, pw: pw });
            auth.pw = auth.generateHash(pw);
            auth.save(err => {
                if(err) reject(err);
                resolve('success');
            });
        });
    });

    const response = (msg) => {
        res.json({ message:msg });
    };

    const onError = (error) => {
        console.log(error);
        res.status(403).json(error);
    };

    badInputCheck().then(existCheck).then(response).catch(onError);

});

router.post('/login', (req, res) => {
    const { id, pw } = req.body.formData;
    const secret = req.app.get('jwt-secret');

    const loginRequest = () => new Promise((resolve, reject) => {
        if(typeof id !== 'string' || typeof pw !== 'string') reject('Bad input');
        Auth.findOne({id: id}, (err, auth) => {
            if(err) reject(err);
            if(!auth) reject('Login failed');
            resolve(auth);
        });
    });

    const validPw = (auth) => new Promise((resolve, reject) => {
        if(!auth.validateHash(pw)) reject('login failed');
        req.session.auth = { id: auth.id };
        resolve(auth);
    });

    const createToken = (auth) => new Promise((resolve, reject) => {
        jwt.sign({
            id: auth.id
        }, secret, {
            expiresIn: '1d',
            issuer: 'DevTeam',
            subject: 'userInfo'
        }, (err, token) => {
            if(err) reject(err);
            resolve({
                token: token,
                id: auth.id
            });
        });
    });

    const response = (auth) => {
        console.log(auth);
        res.json({ message: 'logged in successfully', auth });
    };

    const onError = (error) => {
        console.log(error);
        res.status(403).json(error);
    };

    loginRequest().then(validPw).then(createToken).then(response).catch(onError);
});

router.use('/check', authMiddleware);
router.get('/check', (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    });
});

export default router;
