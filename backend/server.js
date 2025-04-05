const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const twilio = require('twilio');

// ✅ Load .env file properly with full path
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Debug ENV values
console.log("🧪 ENV CHECK:");
console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("FROM:", process.env.TWILIO_PHONE);
console.log("TO:", process.env.ALERT_RECEIVER_PHONE);

// ✅ Destructure environment variables
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE,
  ALERT_RECEIVER_PHONE,
  PORT
} = process.env;

// ✅ Ensure all required environment variables are present
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE || !ALERT_RECEIVER_PHONE) {
  console.error("❌ Missing Twilio configuration in .env file.");
  process.exit(1);
}

// ✅ Initialize Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// ✅ Route to send SOS
app.post('/send-sos', (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, error: "Missing latitude or longitude" });
  }

  const message = `🚨 SOS Alert!\nLocation:\nLatitude: ${latitude}\nLongitude: ${longitude}\nGoogle Maps: https://www.google.com/maps?q=${latitude},${longitude}`;

  client.messages
    .create({
      body: message,
      from: TWILIO_PHONE,
      to: ALERT_RECEIVER_PHONE,
    })
    .then((msg) => {
      console.log("✅ SOS sent successfully:", msg.sid);
      res.json({ success: true, sid: msg.sid });
    })
    .catch((err) => {
      console.error("❌ Twilio send error:", err);
      res.status(500).json({ success: false, error: err.message });
    });
});

// ✅ Start the server
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
});
