const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const twilio = require('twilio');

// ✅ Load .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Destructure ENV
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE,
  ALERT_RECEIVER_PHONE,
  PORT
} = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE || !ALERT_RECEIVER_PHONE) {
  console.error("❌ Missing Twilio config in .env");
  process.exit(1);
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// ✅ SOS API route
app.post('/send-sos', (req, res) => {
  const { type, latitude, longitude } = req.body;

  const locationLink = latitude && longitude
    ? `\nLocation: https://www.google.com/maps?q=${latitude},${longitude}`
    : '';

  const message = `🚨 SOS Alert!\nType: ${type}${locationLink}`;

  client.messages
    .create({
      body: message,
      from: TWILIO_PHONE,
      to: ALERT_RECEIVER_PHONE,
    })
    .then((msg) => {
      console.log("✅ SOS sent:", msg.sid);
      res.json({ success: true, sid: msg.sid });
    })
    .catch((err) => {
      console.error("❌ Twilio send error:", err);
      res.status(500).json({ success: false, error: err.message });
    });
});

const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
});
