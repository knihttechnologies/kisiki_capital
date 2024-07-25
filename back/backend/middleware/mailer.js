const nodemailer = require('nodemailer')
const sendEmail = async (options) =>{
    // 1) Create Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: options?.from,
        to: options?.to,
        subject: options?.subject,
        html: options?.html,
    }

    // 3) Send email
    transporter.verify(function(error, success) {
        if (error) {
            // res.status(500).json({message: "Sending mail failed"})
            console.log('Server is not ready to take our messages', error);
            // next()
        } else if(success){
            // res.status(200).json({message: "Mail was sent"})
            console.log('Server is ready to take our messages')
            // next()
        }
    });

    // 3) Send email
    await transporter.sendMail(mailOptions,
        (error, info) => {
            if (error) {
                // res.status(500).json({message: "Sending mail failed"})
                console.log( error);
                return error
            } else if(success){
                // res.status(200).json({message: "Mail was sent"})
                console.log('Mail sent')
                return info
            }

        }
    );
}

module.exports = {
    sendEmail
}