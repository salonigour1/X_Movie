import React from 'react';
import './CastMember.css';
import { useSelector } from 'react-redux';
import noImage from '../../assets/avatar.png';
import Image from '../LazyLoadingImage/Image';

function CastMember({ castMemberData }) {
  const { url } = useSelector((state) => state.home);

  console.log(castMemberData.name);
  console.log(url.backdrop + castMemberData.profile_path);
  return (
    <div className='castCard'>
      <Image
        className='castProfile'
        src={
          castMemberData.profile_path
            ? url.backdrop + castMemberData.profile_path
            : noImage
        }
      />
      <div className='castName'>{castMemberData.original_name}</div>
      <div className='castCharacterName'>{castMemberData.character}</div>
    </div>
  );
}

export default CastMember;
