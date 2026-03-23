import nodemailer from 'nodemailer';
import { connectToDatabase } from '../lib/dbConnect';
import Contact from '../model/Contact';

async function saveToDatabase(data) {
  await connectToDatabase();
  const contact = new Contact(data);
  await contact.save();
}

async function sendEmail(data) {
  let transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.contact_email,
    BCC: `info@neoconveyors.com, sales@neoconveyors.com`,
    subject: 'New Inquiry from Neo Conveyors Contact Form',
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Submission</title>
                <style>
                    /* General Styles */
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f7f7f7;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    /* Header */
                    .header {
                        background: linear-gradient(135deg, #3498db, #2c3e50);
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                    }

                    .header h2 {
                        margin: 0;
                        font-size: 24px;
                        font-weight: bold;
                    }

                    .header p {
                        margin: 5px 0 0;
                        font-size: 16px;
                    }

                    /* Content */
                    .content {
                        padding: 20px;
                    }

                    .content h3 {
                        font-size: 20px;
                        color: #3498db;
                        margin-bottom: 15px;
                    }

                    .details {
                        background: #f9f9f9;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }

                    .details p {
                        margin: 10px 0;
                        font-size: 16px;
                        color: #555;
                        display: flex;
                        align-items: center;
                    }

                    .details strong {
                        color: #333;
                        margin-right: 10px;
                    }

                    .details img.icon {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                    }

                    /* Footer */
                    .footer {
                        background: #2c3e50;
                        color: #fff;
                        text-align: center;
                        padding: 15px;
                        font-size: 14px;
                    }

                    .footer a {
                        color: #3498db;
                        text-decoration: none;
                    }

                    .footer a:hover {
                        text-decoration: underline;
                    }

                    /* Button */
                    .button {
                        display: inline-block;
                        background: #3498db;
                        color: #fff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        font-size: 16px;
                    }

                    .button:hover {
                        background: #2980b9;
                    }
                </style>
            </head>
            <body>
                <div className="container">
                    <!-- Header -->
                    <div className="header">
                        <h2>New Contact Form Submission</h2>
                        <p>You have received a new inquiry through the website.</p>
                    </div>

                    <!-- Content -->
                    <div className="content">
                        <h3>Contact Details</h3>
                        <div className="details">
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" className="icon" alt="Name Icon">
                                <strong>Name:</strong> ${data.contact_name}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" className="icon" alt="Email Icon">
                                <strong>Email:</strong> ${data.contact_email}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/126/126341.png" className="icon" alt="Mobile Icon">
                                <strong>Mobile:</strong> ${data.contact_mobile}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/126/126341.png" className="icon" alt="Phone Icon">
                                <strong>Phone:</strong> ${data.contact_phone}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/1006/1006363.png" className="icon" alt="Company Icon">
                                <strong>Company:</strong> ${data.company_name}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/323/323325.png" className="icon" alt="Country Icon">
                                <strong>Country:</strong> ${data.contact_country}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" className="icon" alt="Address Icon">
                                <strong>Address:</strong> ${data.contact_address}
                            </p>
                            <p>
                                <img src="https://cdn-icons-png.flaticon.com/512/542/542638.png" className="icon" alt="Message Icon">
                                <strong>Message:</strong> ${data.contact_message}
                            </p>
                        </div>

                        <a href="mailto:${data.contact_email}" className="button">Reply to Sender</a>
                    </div>

                    <!-- Footer -->
                    <div className="footer">
                        <p>© 2025 Neo Conveyors. All Rights Reserved. | <a href="https://www.neoconveyors.com">Visit Our Website</a></p>
                    </div>
                </div>
            </body>
            </html>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const contacts = await Contact.find({});
    return new Response(JSON.stringify(contacts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch contacts' }), { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();

  try {
    await saveToDatabase(data);
    await sendEmail(data);
    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Form submission failed' }), { status: 500 });
  }
}