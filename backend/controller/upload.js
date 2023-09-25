const resp = require("../utils/response");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");
const uploadFile = async (req, res) => {
    try {

        const upload = await cloudinary.v2.uploader.upload(req.file.path);
        return res.json({
            success: true,
            file: upload.secure_url,

        });
    } catch (err) {
        console.log(err)
    }


}

const deleteFile = async (req, res) => {
    const { id } = req.params;
    try {

        await cloudinary.v2.uploader.destroy(id, function (error, result) {
            console.log(result, error)
            resp(res, result, 200);
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { uploadFile, deleteFile }