import express from 'express';
import { User } from '../../types/user';
import _db from '../../config/db';
import { DAO } from '../../types/dao';
import { ObjectId } from 'mongodb';

const router = express.Router();

// @route   GET api/orgs/all
// @desc    Fetches all DAOs
// access   Public
router.get('/all', async (req, res) => {
  try {
    const db = _db.getDb();
    const allOrgs = await db.collection('organizations').find().toArray();
    res.send(allOrgs);
  } catch (error) {}
});

// @route   GET api/orgs/:daoId
// @desc    Fetches all DAOs
// access   Public
router.get('/id/:daoId', async (req, res) => {
  const daoId = req.params.daoId;
  try {
    const db = _db.getDb();
    const org = await db
      .collection('organizations')
      .findOne({ _id: new ObjectId(daoId) });

    res.send(org);
  } catch (error) {}
});

// @route   POST api/orgs/new
// @desc    Creates new DAO
// access   Public
router.post('/new', async (req, res) => {
  const { name, description, image, creatorAddress, creatorId } = req.body;

  try {
    const db = _db.getDb();

    // create new org document
    const result = await db.collection('organizations').insertOne({
      name,
      description,
      image,
      creator: creatorId,
      members: [creatorId],
      teams: [],
    } as DAO);

    // add org to creator's membership array
    const result1 = await db
      .collection('users')
      .updateOne(
        { address: creatorAddress },
        { $push: { memberships: result.insertedId.toString() } }
      );

    res.send('Org Created Successfully');
  } catch (error) {}
});

// @route   POST api/orgs/join
// @desc    Adds user to DAO member list
// access   Public
router.post('/join', async (req, res) => {
  const { userId, daoId } = req.body;

  try {
    const db = _db.getDb();

    // add user to a dao's members array
    const result = await db
      .collection('organizations')
      // @ts-ignore
      .updateOne({ _id: new ObjectId(daoId) }, { $push: { members: userId } });

    // add dao to user's membership array
    const result1 = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { memberships: daoId } }
      );

    res.send('Org Joined Successfully');
  } catch (error) {}
});

module.exports = router;
