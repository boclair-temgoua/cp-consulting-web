import { FC } from 'react'
import ContentLoader from 'react-content-loader';

export const IsLoadingContent: FC = () => {

  return (
    <div className={`card mb-5 mb-xl-8`}>
      <ContentLoader viewBox="0 0 800 200" height={200} width={800}>
        <rect x="20" y="20" rx="10" ry="10" width="40" height="40" />
        <rect x="80" y="20" rx="10" ry="10" width="420" height="15" />
        <rect x="80" y="45" rx="10" ry="10" width="250" height="15" />


        <rect x="20" y="70" rx="10" ry="10" width="40" height="40" />
        <rect x="80" y="70" rx="10" ry="10" width="420" height="15" />
        <rect x="80" y="95" rx="10" ry="10" width="250" height="15" />

        <rect x="20" y="120" rx="10" ry="10" width="40" height="40" />
        <rect x="80" y="120" rx="10" ry="10" width="420" height="15" />
        <rect x="80" y="145" rx="10" ry="10" width="250" height="15" />
      </ContentLoader>
    </div>
  );
};