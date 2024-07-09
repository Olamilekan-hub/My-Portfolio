//import { EmailTemplate } from '../../../components/EmailTemplate';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
// const fromEmail = process.env.FROM_EMAIL;
// export async function POST(req,res) {
//   // const{body} = await req.json();
//   const{email,subject,message} = await req.json();
//   try {
//     const data = await resend.emails.send({
//       from: fromEmail,
//       to: ["adebukolaolamilekan123@gmail.com",email],
//       subject: 'Hello world',
//       react: 
//       <>
//       <h1>{subject}</h1>
//       <p>Thank You for contacting us !</p>
//       <p>New message submitted from {email}</p>
//       <p>{message}</p>
//       </>,
//     });

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error });
//   }
// }

import mailgun from 'mailgun.js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const fromEmail = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, subject, message } = req.body;

    const data = {
      from: fromEmail,
      to: ["adebukolaolamilekan123@gmail.com", email],
      subject: 'Hello world',
      text: `Thank You for contacting us!\n\nNew message submitted from ${email}\n\n${message}`,
      html: `
        <h1>${subject}</h1>
        <p>Thank You for contacting us!</p>
        <p>New message submitted from ${email}</p>
        <p>${message}</p>
      `,
    };

    const response = await mg.messages().send(data);
    return res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
}

