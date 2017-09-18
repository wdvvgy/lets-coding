import express from 'express';
import hackerEarth from 'hackerearth-node';
import Auth from '../models/auth';
import Code from '../models/code';
import mongoose from 'mongoose';

const router = express.Router();
const runModule = new hackerEarth(
    '56b6edf7664775180911b763b1c9342f9abc7c87'
);

router.post('/run', (req, res) => {
    const { code, mode } = req.body.obj;
    if(typeof code !== 'string' || typeof mode !== 'string') return res.json({message: 'Bad Request'});

    let config = { };
    config.time_limit = 1;
    config.memory_limit=323244;  //your memory limit in integer
    config.source = code;  //your source code for which you want to use hackerEarth api
    config.input = "";  //input against which you have to test your source code
    if(mode === 'c_cpp') config.language = 'CPP11';
    else if(mode === 'java') config.language = 'JAVA';
    else if(mode === 'javascript') config.language = 'JAVASCRIPT_NODE';
    else if(mode === 'python') config.language = 'Py';
    else return res.json({message: 'Bad Request'});

    // compile & run
    runModule.compile(config)
    .then(result => {
        runModule.run(config).then(result => {
            return res.json({message: 'run success',result});
        }).catch(err => {
            return res.json(err);
        });
    }).catch(err => {
        console.log(err);
        return res.json(err);
    });

});

router.post('/save', (req, res) => {
    const { id, title, src, result, desc, lang } = req.body.obj;
    if(typeof id !== 'string' || typeof lang !== 'string' || typeof desc !== 'string' || typeof title !== 'string' || typeof src !== 'string' || typeof result !== 'string'){
        return res.json({message: 'Bad Request'});
    }

    const existIdCheck = () => new Promise((resolve, reject) => {
        Auth.findOne({id: id}, (err, exists) => {
            if(err) reject(err);
            if(!exists) reject('Not Existing Id');
            resolve();
        });
    });

    const saveCode = () => new Promise((resolve, reject) => {
        let code = new Code({id: id, title: title, src: src, result: result, desc: desc, lang: lang});
        code.save((err, obj) => {
            if(err) reject(err);
            resolve(obj._id);
        })
    });

    const response = (id) => {
        res.json({result: id});
    };

    const onError = (error) => {
        console.log(error);
        res.status(500).json(error);
    };

    existIdCheck().then(saveCode).then(response).catch(onError);

});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(typeof id !== 'string') return res.json({message: 'Bad Request'});

    const getCode = () => new Promise((resolve, reject) => {
        Code.find({id: id}, (err, exists) => {
            if(err) reject(err);
            if(!exists) reject('No data');
            resolve(exists);
        });
    });

    const response = (code) => {
        res.json({result:code});
    };

    const onError = (error) => {
        console.log(error);
        res.status(403).json(error);
    };

    getCode().then(response).catch(onError);

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.json({message: "INVALID ID"});

    const existCheck = () => new Promise((resolve, reject) => {
        Code.findById(id, (err, code) => {
            if(err) reject(err);
            if(!code) reject('No data');
            resolve();
        });
    });

    const removeData = () => new Promise((resolve, reject) => {
        Code.remove({_id: id}, (err) => {
            if(err) reject(err);
            resolve();
        });
    });

    const response = () => {
        console.log('rmeove success');
        res.json({result:'SUCCESS'});
    };

    const onError = (error) => {
        console.log(error);
        res.status(403).json(error);
    };

    existCheck().then(removeData).then(response).catch(onError);

});

export default router;
