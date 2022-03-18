import express from 'express';
import _db from '../../config/db';
import { ObjectId } from 'mongodb';

const router = express.Router();

// @route   GET api/teams/dao/:daoId
// @desc    Creates a new Team
// access   Public
router.get('/dao/:daoId', async (req, res) => {
  const daoId = req.params.daoId;
  try {
    const db = _db.getDb();
    const result = await db
      .collection('teams')
      .find({ daoId: new ObjectId(daoId) })
      .toArray();

    res.send(result);
  } catch (error) {}
});

// @route   POST api/teams/new
// @desc    Creates a new Team
// access   Public
router.post('/new', async (req, res) => {
  const { daoId, name } = req.body;

  try {
    const db = _db.getDb();

    // add a team to a dao's teams array
    const result = await db
      .collection('teams')
      // @ts-ignore
      .insertOne({ daoId: new ObjectId(daoId), name, members: [] });

    res.send('Team Created Successfully');
  } catch (error) {}
});

// @route   POST api/teams/join
// @desc    Join a Team
router.post('/join', async (req, res) => {
  const { daoId, teamName, userId } = req.body;
  try {
    const db = _db.getDb();

    const result = await db
      .collection('teams')
      .updateOne(
        { daoId: new ObjectId(daoId), name: teamName },
        { $push: { members: userId } }
      );

    res.send(result);
  } catch (error) {}
});

module.exports = router;
