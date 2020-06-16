const router = require('express').Router();
const noticeModel = require('../models/notice');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// const db = require('../db');

router.post('/', function (req, res, next) { // ��������
    noticeModel.find(function (err, noticeData) {
        // ���� �������� �ֽż����� ����Ǳ����� reverse()���
        res.send(noticeData.reverse());
    })
});

router.post('/create', function (req, res, next) { // �۾���
    var newNotice = new noticeModel({
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents,
        date: req.body.date
        // contents: JSON.stringify(req.body.contents),
    });
    newNotice.save(function (err) {
        if (err) {
            return console.log('saveError', err);
        } else {
            noticeModel.find(function (err, noticeData) {
                res.send(noticeData.reverse());
            })
        }
    });
});

router.post('/modify/:nid', function (req, res, next) { // modify ��û
    noticeModel.findOne({ nid: req.body.nid }, function (err, modifyRes) {
        modifyRes.category = req.body.category
        modifyRes.title = req.body.title
        modifyRes.contents = req.body.contents
        modifyRes.save(function (err) {
            if (err) {
                return console.log('modifyError', err);
            } else {
                noticeModel.find(function (err, noticeData) {
                    res.send(noticeData.reverse());
                })
            }
        })
    });
});

router.post('/:nid', function (req, res, next) { // detail ��û��
    noticeModel.findOneAndUpdate({ nid: req.body.nid },
        { $inc:{ viewCnt: +1 }}, 
        { returnnew: true },
        function (err, detailData) {
        res.send(detailData);
    })
});

router.post('/delete/:nid', function (req, res, next) { // delete ��û
    console.log('hee', req.body.nid, req.body)
    noticeModel.deleteOne({ nid: req.body.nid }, function (err, deleteRes) {
        if (err) {
            return console.log('deleteError', err);
        } else {
            noticeModel.find(function (err, noticeData) {
                res.send(noticeData.reverse());
            })
        }
    })
});

module.exports = router;