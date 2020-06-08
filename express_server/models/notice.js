const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


const noticeSchema = mongoose.Schema({
    // notice
    nid: { type: Number, required: true },
    title: { type: String, required: true },
    contents: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    viewCnt: { type: Number, default: 0}
},
{
    collection: 'notices'
});

autoIncrement.initialize(mongoose.connection);

noticeSchema.plugin(autoIncrement.plugin, {
    model: 'noticeModel',
    field: 'nid',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('noticeModel', noticeSchema);
