'use client';

import { ApplicantInfo } from '@/types/article';
import ApplicantItem from './ApplicantItem';

interface Props {
  articleId: string;
}

const ApplicantList = ({ articleId }: Props) => {
  const applicants: ApplicantInfo[] = [
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
        <ApplicantItem
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

export default ApplicantList;
