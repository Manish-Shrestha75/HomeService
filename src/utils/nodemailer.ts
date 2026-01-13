import nodemailer from 'nodemailer';

const EMAIL_USER = 'bantuxtha@gmail.com';
const EMAIL_PASS = 'ceqdknqcqiamtzjf'; 

console.log('Using hardcoded email:', EMAIL_USER);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export const sendOTPEmail = async(email: string, otp: string): Promise<boolean> => {
    console.log(`Sending OTP ${otp} to ${email}`);
    
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
            <h3>Your OTP Code</h3>
            <p>Use this code to login:</p>
            <h2>${otp}</h2>
            <p>Valid for 10 minutes.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent!');
        return true;
    } catch (error: any) {
        console.error('Email error:', error.message);
        return false;
    }
};