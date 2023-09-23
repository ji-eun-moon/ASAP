import React from 'react';
import Intro from 'components/main/Intro';
import Footer from 'components/common/Footer';
import HowToUse from 'components/main/HowToUse';

function PublicMain() {
  return (
    <div>
      <Intro navigate="/api_list" text="API 살펴보기" />
      <HowToUse />
      <Footer />
    </div>
  );
}

export default PublicMain;
