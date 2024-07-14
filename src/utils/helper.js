const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS, VERIFICATION_LINK_PREFIX } = require('../config/serverConfig');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const sendVerificationEmail = (user, token) => {
    const url = VERIFICATION_LINK_PREFIX + `${token}`;
    const mailOptions = {
        from: EMAIL_USER,
        to: user.email,
        subject: 'Email Verification',
        html: `Please click this link to verify your email: <a href="${url}">${url}</a>`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail,
};