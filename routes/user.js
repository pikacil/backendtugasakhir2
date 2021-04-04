const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const auth = require('../middleware/auth')

router.get('/',auth.authenticateJWT,userController.getuser);

router.route('/:id').get(userController.getuserByID);
router.route('/daftar').post(userController.signup);
router.route('/masuk').post(userController.masuk);
// router.route('/registrasi').post(userController.registrasi);
router.route('/:id').patch(userController.updateuser);
router.route('/:id').delete(userController.deleteuser);
router.route('/nik/:nik').get(userController.getUserByNik);
router.route('/nama/:nama').get(userController.getUserByNama);
router.route('/alamat/:alamat').get(userController.getUserByAlamat);
// router.route('/validasi/:nik').get(userController.getUserlogin);
module.exports =router