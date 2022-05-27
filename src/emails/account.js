const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'raviganeshmbhat999@gmail.com',
        subject: 'Great to see you',
        text: `Welcome, ${name}`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'raviganeshmbhat999@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
