import { FC } from 'react'
import ContentLoader from 'react-content-loader';

export const IsLoadingHeader: FC = () => {

  return (
    <div className={`card mb-5 mb-xl-8`}>
    <ContentLoader viewBox="0 0 700 200" height={200} width={700}>
      <rect x="20" y="15" rx="20" ry="20" width="150" height="150" />
      <rect x="180" y="17" rx="10" ry="10" width="420" height="15" />
      <rect x="180" y="45" rx="10" ry="10" width="315" height="15" />

      <rect x="180" y="100" rx="8" ry="8" width="130" height="40" />
      <rect x="320" y="100" rx="8" ry="8" width="130" height="40" />
      <rect x="460" y="100" rx="40" ry="40" width="40" height="40" />
      <rect x="490" y="100" rx="40" ry="40" width="40" height="40" />
      <rect x="520" y="100" rx="40" ry="40" width="40" height="40" />
      <rect x="550" y="100" rx="40" ry="40" width="40" height="40" />

      <rect x="20" y="170" rx="8" ry="8" width="80" height="20" />
      <rect x="110" y="170" rx="8" ry="8" width="80" height="20" />
      <rect x="200" y="170" rx="8" ry="8" width="80" height="20" />
      <rect x="290" y="170" rx="8" ry="8" width="80" height="20" />
    </ContentLoader>
  </div>
  );
};