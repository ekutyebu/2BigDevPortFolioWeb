import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AutoReplyEmailProps {
  name: string;
}

export const AutoReplyEmail = ({ name }: AutoReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>Thanks for reaching out!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Message Received</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Thank you for reaching out! I've received your message and will get back to you 
          as soon as possible. I typically respond within 24 hours.
        </Text>
        <Hr style={hr} />
        <Text style={text}>
          In the meantime, feel free to check out my latest blog posts or projects on my portfolio.
        </Text>
        <Section style={{ textAlign: 'center' as const }}>
          <Text style={footer}>
            Best regards,<br />
            <strong>2BigDev Team</strong>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  border: "1px solid #e6ebf1",
};

const h1 = {
  color: "#0ea5e9",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 20px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "20px",
};
