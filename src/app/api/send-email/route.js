// app/api/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
            pool: true,
            maxConnections: 1,
            socketTimeout: 3000,
            connectionTimeout: 3000,
        });
    }
    return transporter;
};

// Simple & Short Email Template
const getSimpleEmailHTML = (data) => {
    return `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#fdf2ef;border-radius:8px;border:1px solid #dc873e30;">
        <div style="background:#813241;padding:15px;text-align:center;border-radius:8px 8px 0 0;">
            <h2 style="color:#fdf2ef;margin:0;font-size:18px;">📋 Inquiry From ${data.name}</h2>
        </div>
        <div style="padding:15px;background:white;">
            <p style="margin:0 0 10px 0;"><strong>👤 Name:</strong> ${data.name}</p>
            <p style="margin:0 0 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color:#813241;">${data.email}</a></p>
            <p style="margin:0 0 10px 0;"><strong>📞 Phone:</strong> <a href="tel:${data.phone}" style="color:#813241;">${data.phone}</a></p>
            <p style="margin:0 0 10px 0;"><strong>📅 Date:</strong> ${data.date}</p>
            <p style="margin:0 0 10px 0;"><strong>👥 Guests:</strong> ${data.guests}</p>
            <p style="margin:0;padding:10px;background:#fdf2ef;border-left:3px solid #dc873e;border-radius:4px;">
                <strong>💬 Message:</strong><br>${data.message}
            </p>
        </div>
        <div style="background:#2a2724;padding:10px;text-align:center;border-radius:0 0 8px 8px;">
            <p style="color:#fdf2ef;margin:0;font-size:12px;">
                <a href="tel:${data.phone}" style="color:#dc873e;text-decoration:none;">📞 Call ${data.phone}</a>
            </p>
        </div>
    </div>
    `;
};

export async function POST(request) {
    const startTime = Date.now();

    try {
        const body = await request.json();
        const { name, email, phone, date, guests, message } = body;

        if (!name || !email || !phone || !date || !guests || !message) {
            return NextResponse.json(
                { error: "All fields required" },
                { status: 400 }
            );
        }

        const transporter = getTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Vaidik Wedding Lawns - Inquiry From ${name}`,
            html: getSimpleEmailHTML({ name, email, phone, date, guests, message }),
            headers: {
                'Priority': 'high',
                'X-Priority': '1'
            }
        };

        // Send in background
        transporter.sendMail(mailOptions)
            .then(info => {
                console.log(`✅ Email sent in ${Date.now() - startTime}ms`);
            })
            .catch(err => {
                console.error('❌ Email error:', err.message);
            });

        return NextResponse.json(
            {
                success: true,
                message: "Inquiry sent successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: "Failed to send inquiry" },
            { status: 500 }
        );
    }
}