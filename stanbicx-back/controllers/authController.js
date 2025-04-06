import { client } from '../utils/twitterClient.js';
import pool from '../db.js';

export const sendOTP = async (req, res) => {
  const { twitterId, username } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await pool.query(
    'INSERT INTO otps (twitter_id, otp, created_at) VALUES (?, ?, NOW())',
    [twitterId, otp]
  );

  try {
    await client.post("direct_messages/events/new", {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: twitterId },
          message_data: { text: `Your OTP is: ${otp}` }
        }
      }
    });

    res.json({ success: true, message: 'OTP sent via DM' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send DM' });
  }
};

export const verifyOTP = async (req, res) => {
  const { twitterId, otp } = req.body;

  const [rows] = await pool.query(
    'SELECT * FROM otps WHERE twitter_id = ? ORDER BY created_at DESC LIMIT 1',
    [twitterId]
  );

  if (rows.length && rows[0].otp === otp) {
    return res.json({ success: true });
  }

  res.status(400).json({ success: false, error: 'Invalid OTP' });
};
