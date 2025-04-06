const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const twilio = require('twilio');
const opencage = require('opencage-api-client');

// ✅ Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE,
  ALERT_RECEIVER_PHONE,
  OPENCAGE_API_KEY,
  PORT
} = process.env;

// ✅ Check all necessary envs
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE || !ALERT_RECEIVER_PHONE || !OPENCAGE_API_KEY) {
  console.error("❌ Missing required environment variables in .env");
  process.exit(1);
}

// ✅ Twilio init
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// ✅ SOS endpoint
app.post('/send-sos', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, error: "Missing latitude or longitude" });
  }

  try {
    // ✅ Get location name
    const geo = await opencage.geocode({ q: `${latitude},${longitude}`, key: OPENCAGE_API_KEY });

    const locationName = geo.results?.[0]?.formatted || 'Unknown Location';
    const message = `🚨 SOS Alert!\n📍 Location: ${locationName}\n🌍 Map: https://www.google.com/maps?q=${latitude},${longitude}`;

    const response = await client.messages.create({
      body: message,
      from: TWILIO_PHONE,
      to: ALERT_RECEIVER_PHONE,
    });

    console.log("✅ SOS sent:", response.sid);
    res.json({ success: true, sid: response.sid });
  } catch (err) {
    console.error("❌ SOS error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Start the server
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server running on port ${serverPort}`);
});
