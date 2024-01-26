import { PropsWithChildren } from 'react';
import GithubCorner from 'react-github-corner';

export default function GithubCorneredLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <GithubCorner
        href="https://github.com/imaphatduc/chaos-simulator"
        bannerColor="#3344da"
        direction="left"
        svgStyle={{
          zIndex: 100,
        }}
      />
    </div>
  );
}
