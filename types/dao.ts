import { ObjectId } from 'mongodb';

export interface Team {
  title: string;
  description: string;
  members: (number | ObjectId)[];
}

interface Member {
  id: string | number | ObjectId;
  // name: string;
  // address: string;
}

export interface DAO {
  name: string;
  description: string;
  image: string; // ipfs string
  creator: string | ObjectId;
  teams: Team[];
  members: Member[];
}
