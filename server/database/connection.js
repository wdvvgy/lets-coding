import mongoose from 'mongoose';

const uri = 'mongodb://localhost/project';
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/project');
