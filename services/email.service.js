import config from "config";
import nodemailer from "nodemailer";
import { exit } from "process";
import {
  createActivationUserMail,
  createResetPasswordMail,
} from "../utils/mail.js";

class EmailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: config.get("SMTP_USER"),
        pass: config.get("SMTP_PASSWORD"),
      },
    });

    this.transporter.verify((err) => {
      if (err) {
        console.log(err);
        exit(1);
      }
      console.log("Server is ready to take our messages");
    });
  }

  sendActivationUserMail(userMail, link) {
    this.transporter.sendMail({
      to: userMail,
      subject: "Account activation",
      html: createActivationUserMail(link),
    });
  }

  sendResetPasswordMail(userMail, link) {
    this.transporter.sendMail({
      to: userMail,
      subject: "Reset password",
      html: createResetPasswordMail(link),
    });
  }
}

export default new EmailService();
