const {router:userRouter} = require('./userRouter');
const {router:studentRouter} = require('./studentRouter');
const {router:lessonRouter} = require('./lessonRouter');
const {router:categoryrouter} = require('./categoryRouter');
const express = require('express');
const router = express.Router();

router.use('/users',userRouter);
router.use('/students',studentRouter);
router.use('/lessons',lessonRouter);
router.use('/category',categoryrouter);

module.exports = {router};