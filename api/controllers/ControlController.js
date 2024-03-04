/**
 * ControlController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async create(req, res) {
        try {
            const { text } = req.body
            const { id } = req.user
            const newControl = await Control.create({
                idUser: id,
                text,

            }).fetch();
            res.ok({
                data: newControl,
                message: 'New control created successfully'
            })
        } catch (error) {
            res.serverError(error)
        }
    },
    async update(req, res) {
        try {
            const { text } = req.body
            const { id } = req.params;
            const updateControl = await Control.updateOne({ id })
                .set({ text })
            if (!updateControl) {
                return res.notFound()
            }
            return res.ok({
                updateControl: updateControl,
                message: 'control updated successfully'
            })
        } catch (error) {
            res.serverError(error)
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            const deleteControl = await Control.destroyOne({ id })
            if (!deleteControl) {
                return res.notFound()
            }
            return res.ok({
                deleteControl: deleteControl,
                message: 'control delete successfully'
            })
        } catch (error) {
            res.serverError(error)
        }
    },
    async getAllControl(req, res) {
        try {
            const allUsers = await Control.find()
            res.ok({
                data: allUsers,
                message: 'get all controls'
            })
        } catch (error) {
            res.serverError(error)
        }
    }
};

