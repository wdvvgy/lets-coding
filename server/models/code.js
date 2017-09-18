import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Code = new Schema({
    id: String,
    title: String,
    src: String,
    result: String,
    desc: String,
    created: { type: Date, default: Date.now },
    lang: String
});

export default mongoose.model('code', Code);
