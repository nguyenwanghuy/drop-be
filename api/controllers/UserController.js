/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.badRequest({
                    message: 'Invalid username or password'
                })
            }
            const existingUser = await User.findOne({ username })
            if (!existingUser) {
                return res.badRequest({
                    message: "Wrong username",
                })
            }
            //so sánh password
            const isMatchPassword = await bcrypt.compare(
                //so sánh password người dùng nhập lên với database
                password,
                existingUser.password
            )
            if (!isMatchPassword) {
                return res.badRequest({
                    message: "Wrong password",
                })
            }
            //token
            const jwtPayload = {
                id: existingUser.id,
                username: existingUser.username,
                password: existingUser.password
            }
            const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
                expiresIn: '7d'
            })
            return res.ok({
                accessToken: token,
                message: 'Login successful'
            })
        } catch (error) {
            res.serverError(error)
        }
    },
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.badRequest({
                    message: "Missing required keys",
                });
            }
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.json({
                    message: "User already exists",
                })
            }
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const newUser = await User.create({
                username,
                email,
                password: hashPassword,
            }).fetch();
            return res.ok({
                data: newUser,
                message: 'Register successfully for a new user'
            });
        } catch (error) {
            res.serverError(error)
        }
    },
    async me(req, res) {
        try {
            const { id } = req.user
            const currentUser = await User.findOne(id);
            if (!currentUser) {
                res.notFound('Unauthorized user');
            }
            res.json({
                userInfo: currentUser,
            });
        } catch (error) {
            res.serverError(error)
        }

    },
    async updateProfile(req, res) {
        try {
            const { username, email, password } = req.body
            const { id } = req.params;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const updatedUser = await User.updateOne({ id })
                .set({ 
                    username,
                     email, 
                     password: hashPassword
                     });
            if (!updatedUser) {
                res.badRequest('User not found')
            }
            return res.ok({
                updatedUser: updatedUser,
                message: 'User updated successfully'
            });
        } catch (error) {
            console.log(error);
            return res.serverError(error);
        }
    },
    async getAllUser(req, res) {
        try {
            const allUsers = await User.find()
            res.ok({
                data: allUsers,
                message: 'get all users'
            })
        } catch (error) {
            res.serverError(error)
        }

    },
};

