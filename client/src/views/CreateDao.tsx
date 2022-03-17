import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import ViewLayout from '../components/ViewTemplate';
import { useAuth } from '../hooks/useAuth';
import { setApiUrl } from '../lib/apiUrl';
import { ipfsUpload } from '../lib/ipfsUpload';

const CreateDao = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { account } = useWeb3React();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const { mutate: createDao, isLoading } = useMutation(
    async () => {
      if (!image) {
        setError('Must add image!');
        return;
      }
      if (!account) {
        setError('Must connect wallet first!');
        return;
      }
      const imageUri = await ipfsUpload(image);
      const { data } = await axios({
        url: setApiUrl('/orgs/new'),
        method: 'POST',
        data: {
          name,
          description,
          image: imageUri,
          creatorAddress: account,
          creatorId: profile._id,
        },
      });

      return data;
    },
    { onSuccess: () => navigate('/directory') }
  );

  return (
    <ViewLayout header='Create a DAO'>
      <form
        className='max-w-lg'
        onSubmit={e => {
          e.preventDefault();
          createDao();
        }}
      >
        <div>
          <label className='text-xl font-bold'>DAO Name</label>
          <input
            className='border border-slate-400 py-2 px-3 rounded-lg w-full my-2'
            type='text'
            placeholder='My Cool DAO'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Description</label>
          <textarea
            className='border border-slate-400 py-2 px-3 rounded-lg w-full my-2 h-48'
            placeholder='My Cool DAO'
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl font-bold'>Image / Logo</label>
          <input
            onChange={e => {
              // @ts-ignore
              setImage(e.target.files[0]);
            }}
            type='file'
            className='border border-slate-400 py-2 px-3 rounded-lg w-full my-2'
          />
        </div>

        <button
          className='p-3 border-2 border-slate-400 rounded-xl font-bold text-lg w-80 mt-5'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Creating DAO...' : 'Create DAO'}
        </button>
      </form>
    </ViewLayout>
  );
};

export default CreateDao;
