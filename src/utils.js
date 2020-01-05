import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${nouns[randomNumber]}`;
};

const sendMail = email => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options))
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    console.log(process.env.SENDGRID_USERNAME);
    const email = {
      from: "sgjh40402@gmail.com",
      to: adress,
      subject: "🔒인증키입니다. sakongstagram🔒",
      html: `안녕하세요 인증키는 ${secret}.<br/>복사 붙여넣기 해주세요`
    };
    return sendMail(email);
  };

export const generateToken = id => jwt.sign({id},process.env.JWT_SECRET);