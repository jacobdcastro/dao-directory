import express from 'express';
import { User } from '../../types/user';
import _db from '../../config/db';

const router = express.Router();
const db = _db.getDb();

// @route   POST api/user/signup
// @desc    Signs up a new user
// access   Public
router.post('/signup', async (req, res) => {
  const { address, dateJoined } = req.body;
  const newUser: User = {
    address,
    dateJoined,
    signedMessage: undefined,
    memberships: [],
    following: [],
    name: undefined,
    bio: undefined,
    image: undefined,
    email: undefined,
    twitter: undefined,
    instagram: undefined,
    discord: undefined,
  };

  try {
    const hi = await db.collection('users');
    console.log('hi');
  } catch (error) {
    res.statusCode = 500;
    res.send('an error occured');
  }
});
