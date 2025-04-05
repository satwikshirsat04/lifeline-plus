const express = require('express'); const router = express.Router(); const { sendSMS } = require('../services/twilio');

router.post('/', async (req, res) => { const { latitude, longitude, userType = "public" } = req.body;

const message = 🚨 SOS Alert! User Type: ${userType} Location: https://www.google.com/maps?q=${latitude},${longitude};

try { await sendSMS(message); res.status(200).json({ message: 'SOS Alert Sent Successfully ✅' }); } catch (err) { console.error('❌ SOS failed:', err.message); res.status(500).json({ error: 'Failed to send SOS alert' }); } });

module.exports = router;