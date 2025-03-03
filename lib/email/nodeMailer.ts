import nodemailer from "nodemailer";
import { sendEmailParams } from "./sendEmail";

class Nodemailer {
  constructor() {}

  transporter() {
    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    return transporter;
  }

  sendEmail(params: sendEmailParams) {
    const mailOptions = {
      to: params.toAddress,
      from: params.fromAddress,
      subject: params.subject,
      text: params.body,
    };

    this.transporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`❌ Error sending email: ${error}`);
      } else {
        console.log(`✉️  Email sent successfully: ${info.response}`);
      }
    });
  }
}

export default Nodemailer;
