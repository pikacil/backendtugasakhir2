const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')

router.route('/').post(userController.insertuser);
router.route('/').get(userController.getuser);

router.route('/:id').get(userController.getuserByID);
router.route('/:id').patch(userController.updateuser);
router.route('/:id').delete(userController.deleteuser);
router.route('/nik/:nik').get(userController.getUserByNik);
router.route('/nama/:nama').get(userController.getUserByNama);
router.route('/alamat/:alamat').get(userController.getUserByAlamat);
module.exports =router