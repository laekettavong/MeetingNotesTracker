const express = require('express');
const router = express.Router();
const standupCtrl = require('../controllers/standup.server.controller');

/* GET home page. */
router.get('/', (req, res) => {
  return standupCtrl.list(req, res);
});

/* POST filter by member name - home page. */
router.post('/', (req, res) => {
    return standupCtrl.filterByMember(req, res);
});

/* GET New Note page. */
router.get('/newnote', (req, res) => {
    return standupCtrl.getNote(req, res);
});

/* POST New Note page. */
router.post('/newnote', (req, res) => {
    return standupCtrl.create(req, res);
});

module.exports = router;
