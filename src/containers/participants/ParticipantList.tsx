'use client';

import { ParticipantInfo } from '@/types/article';
import ParticipantItem from './ParticipantItem';

interface Props {
  articleId: string;
}

const ParticipantList = ({ articleId }: Props) => {
  const applicants: ParticipantInfo[] = [
    {
      id: 1,
      nickname: 'kong1',
      profileImageS3SavedURL: null,
      rank: 1,
    },
    {
      id: 2,
      nickname: 'kong2',
      profileImageS3SavedURL: null,
      rank: 2,
    },
    {
      id: 3,
      nickname: 'kong3',
      profileImageS3SavedURL: null,
      rank: null,
    },
  ];

  return (
    <div>
      {applicants.map((applicant) => (
        <ParticipantItem
          key={applicant.id}
          id={applicant.id}
          nickname={applicant.nickname}
          profileImageS3SavedURL={applicant.profileImageS3SavedURL}
          rank={applicant.rank}
        />
      ))}
    </div>
  );
};

export default ParticipantList;
