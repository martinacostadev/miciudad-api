const { Router } = require('express');

const router = Router();

const controller = require('../controllers/lostItems');

const path = 'extravios';

router.get(`/${path}`, controller.getData);

module.exports = router;
