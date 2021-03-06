export interface User {
  id?: number;
  address: string;
  signedMessage?: string; // tbd
  dateJoined: number;
  memberships: number[];
  following: number[];
  name?: string;
  bio?: string;
  image?: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  discord?: string;
}
