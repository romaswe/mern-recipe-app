const express = require('express');
const router = express.Router();

const {
	register,
	login,
	forgotpassword,
	resetpassword,
} = require('../controllers/auth');

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Register a new user
 *     description: Get public route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/register').post(register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Login a user
 *     description: Get public route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/login').post(login);

/**
 * @openapi
 * /api/auth/forgotpassword:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Generate new password reset token
 *     description: Get public route description
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/forgotpassword').post(forgotpassword);

/**
 * @openapi
 * /api/auth/resetpassword/{resetToken}:
 *   put:
 *     tags:
 *     - Auth
 *     summary: Change password with reset token
 *     description: Get public route description
 *     parameters:
 *     - name: "resetToken"
 *       in: "path"
 *       description: "Reset token"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports = router;
