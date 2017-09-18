import express from 'express';
import auth from './auth';
import code from './code';

const router = express.Router();

router.use('/auth', auth);
router.use('/code', code);

export default router;
