import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

// Generate unique ticket ID based on epoch time
function generateTicketId(): string {
  const now = Date.now();
  // Take last 5 digits of epoch time and ensure it's always 5 digits
  const ticketNumber = (now % 100000).toString().padStart(5, '0');
  return `K-${ticketNumber}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  const { ticketId, name, email, department, priority, category, subject, description } = req.body
  if (!name || !email || !priority || !category || !subject || !description) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  // Use provided ticket ID or generate a new one
  const finalTicketId = ticketId || generateTicketId();

  // Create secure SMTP transporter for SMTP2GO
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // Use SSL for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Support Ticket ${finalTicketId}: ${subject}`,
      text: `
Support Ticket: ${finalTicketId}
Name: ${name}
Email: ${email}
Department: ${department || 'Not specified'}
Priority: ${priority}
Category: ${category}
Subject: ${subject}

Description:
${description}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Support Ticket ${finalTicketId}
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Ticket Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 120px;">Ticket ID:</td>
                <td style="padding: 8px 0; font-family: monospace; font-size: 16px; color: #1f2937;">${finalTicketId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Department:</td>
                <td style="padding: 8px 0; color: #1f2937;">${department || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Priority:</td>
                <td style="padding: 8px 0;">
                  <span style="background-color: ${priority === 'urgent' ? '#fef2f2' : priority === 'high' ? '#fef3c7' : priority === 'medium' ? '#dbeafe' : '#f0fdf4'}; 
                               color: ${priority === 'urgent' ? '#dc2626' : priority === 'high' ? '#d97706' : priority === 'medium' ? '#2563eb' : '#16a34a'}; 
                               padding: 4px 8px; border-radius: 4px; text-transform: capitalize;">
                    ${priority}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Category:</td>
                <td style="padding: 8px 0; color: #1f2937; text-transform: capitalize;">${category.replace(/-/g, ' ')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Subject:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Description</h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #1f2937; line-height: 1.5;">
${description}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This ticket was submitted via the support form. Please respond directly to ${email} or reference ticket ID ${finalTicketId} in your communications.</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    return res.status(200).json({ 
      message: "Support ticket created successfully!", 
      ticketId: finalTicketId 
    })
  } catch (error) {
    console.error("SMTP error:", error)
    return res.status(500).json({ message: "Failed to send email" })
  }
}