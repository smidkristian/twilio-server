import { Twilio } from 'twilio';

const getTwilioClient = () => {
    return new Twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
    });
};

export const twilioClient = getTwilioClient();
