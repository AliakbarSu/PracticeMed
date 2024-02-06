import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const PracticeMedWelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to PracticeMed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src="https://res.cloudinary.com/dxuf2ssx6/image/upload/q_10/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
            width="65"
            height="65"
            alt="PracticeMed"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Thanks for signing up to PracticeMed. You're now all set to take
            your first mock test!
          </Text>
          <Text style={paragraph}>
            You can view available mock tests and your past tests right from the
            dashboard page.
          </Text>
          <Button style={button} href="https://practicemed.org/dashboard">
            View your dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our{" "}
            <Link style={anchor} href="https://practicemed.org/contact">
              contact
            </Link>{" "}
            and{" "}
            <Link style={anchor} href="https://practicemed.org/faqs">
              FAQ
            </Link>{" "}
            pages.
          </Text>
          <Text style={paragraph}>— The Practice Med team</Text>
          <Hr style={hr} />
          <Text style={footer}>Practice Med org.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PracticeMedWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
