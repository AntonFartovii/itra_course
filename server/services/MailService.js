import * as nodemailer from 'nodemailer'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            post: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activation ${process.env.API_URL}`,
            text: '',
            html:
          `  <div>
                <h1>For activate</h1>
                <a href="${link}">${link}</a>
            </div>`
        })
    }
}

export const mailService = new MailService()