const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { fieldsValidation } = require('../middlewares/fields-validations.middleware');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');


const router = Router();
// Route => Auth
router.post('/', [
    check('email', 'Email is a required field').not().isEmpty().isEmail(),
    check('password','password is a required field').not().isEmpty(),
    fieldsValidation
], login);

router.post('/google', [
    check('token', 'Token couldnt catch token').not().isEmpty(),
    fieldsValidation
], googleSignIn);


router.get('/renew',
    isJwtValid,
    renewToken);


module.exports = router;