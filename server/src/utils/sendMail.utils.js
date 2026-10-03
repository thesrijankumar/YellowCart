const nodemailer = require("nodemailer")

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTestAccount({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }

        await transporter.sendMail(mailOptions);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Unknown Error while sending mail"})
    }
}

module.exports = sendMail;































