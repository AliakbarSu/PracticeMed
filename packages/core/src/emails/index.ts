import { Config } from "sst/node/config";
import sendgrid from "@sendgrid/mail";
import sgMailClient from "@sendgrid/client";
import { render } from "@react-email/render";
// @ts-ignore
import PracticeMedWelcomeEmail from "./templates/Welcome";

sendgrid.setApiKey(Config.SENDGRID_API_KEY);
sgMailClient.setApiKey(Config.SENDGRID_API_KEY);

export const sendSingleEmail = async (data: any) => {
  const request = {
    url: `/v3/mail/send`,
    method: "POST" as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`,
    },
    body: data,
  };

  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject);
  });
};

export const sendWelcomeEmail = async (email: string) => {
  const emailHtml = render(PracticeMedWelcomeEmail());

  const options = {
    from: "info@practicemed.org",
    to: email,
    subject: "Welcome to PracticeMed!",
    html: emailHtml,
  };

  try {
    await signupToPlatformUsers(email);
  } catch (e) {
    console.log("Error while signing up to platform users");
  }

  try {
    await sendgrid.send(options);
  } catch (e) {
    const error = e as any;
    console.log("Error while sending welcome email");
    console.log(error?.response?.body);
  }
  return "email sent";
};

const signupToPlatformUsers = (email: string) => {
  const data = {
    list_ids: ["108d449c-dae1-43aa-8694-7abcbbcfd74f"], // Platform Users id
    contacts: [
      {
        email,
      },
    ],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT" as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`,
    },
    body: data,
  };
  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject);
  });
};
