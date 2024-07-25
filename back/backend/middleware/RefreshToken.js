const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config
 
const RefreshToken = async(req, res) => {
    try
    {
        const Admins = db.Admins
        const refreshToken = req?.cookies?.refreshToken
        if (!refreshToken) return res.status(404).json({msg: 'no refresh token found'})
        const user = await Admins.findOne({
            where:{refresh_token: refreshToken},
            attributes: [
                'admin_id',
                'admin_name',
                'admin_email',
                'admin_password',
                'admin_role',
                'admin_profilepicture',
                'isVerified_admin',
                'refresh_token'
            ]
        })
        user 
            ? jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if(err) return res.status(400).json({message: `There was an error verifying your token`})
                    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: '1440s'
                    });
                    return res.json( accessToken )
                    
                })
            : res.sendStatus(400)
    } catch (error) {
        res.status(400).json({msg: `m`})
        console.log(error);
    }
}
module.exports = {RefreshToken}