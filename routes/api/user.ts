import express from 'express';
import { User } from '../../types/user';
import _db from '../../config/db';

const router = express.Router();

// @route   POST api/user/:address
// @desc    Signs up a new user
// access   Public
router.get('/:address', async (req, res) => {
  const { address } = req.params;
  console.log(address);
  try {
    const db = _db.getDb();
    const user = await db.collection('users').findOne({ address });

    if (user) {
      res.send(user);
    } else {
      // if no user, create user document
      await db.collection('users').insertOne({
        address,
        dateJoined: Date.now(),
        memberships: [],
        following: [],
      } as User);

      const newUser = await db.collection('users').findOne({ address });

      res.send(newUser);
    }
  } catch (error) {}
});

// ! =========================================
// ! SECURITY THREAT
// ! profile signup/creation are public endpoints
// ! =========================================
// TODO add signTypedData_v4 to verify humanship before editing profile

// @route   POST api/user/:address
// @desc    Updates user profile
// access   Public
router.post('/:address', async (req, res) => {
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
    const db = _db.getDb();
    const hi = await db.collection('users');
  } catch (error) {
    res.statusCode = 500;
    res.send('an error occured');
  }
});

module.exports = router;
