export interface Team {
  title: string;
  description: string;
  members: number[];
}

interface Member {
  id: number;
  // name: string;
  // address: string;
}

export interface DAO {
  id: number;
  name: string;
  description: string;
  image: string; // ipfs string
  teams: Team[];
  members: Member[];
}
