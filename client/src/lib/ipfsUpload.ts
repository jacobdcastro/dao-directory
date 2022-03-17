import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({
  // @ts-ignore
  token: process.env.REACT_APP_NFTSTORAGE_API_KEY,
});

export const ipfsUpload = async (file: File) => {
  const cid = await client.storeBlob(file);
  const imageUri = `https://ipfs.io/ipfs/${cid}`;
  console.log('Uploaded to IPFS at', imageUri);
  return imageUri;
};
