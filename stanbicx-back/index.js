import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import './auth/twitter.js'; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(session({
  secret: 'stanbicx_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  (req, res) => {
    const twitterId = req.user.id;
    const username = req.user.username;
    res.redirect(`${process.env.CLIENT_URL}/otp?twitterId=${twitterId}&username=${username}`);
  }
);


app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));