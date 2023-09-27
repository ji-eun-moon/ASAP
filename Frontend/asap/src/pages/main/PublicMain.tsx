import React from 'react';
import Intro from 'components/main/Intro';
import Footer from 'components/common/Footer';
import HowToUse from 'components/main/HowToUse';
import Service from 'components/main/Service';
import { Fade } from 'react-awesome-reveal';

function PublicMain() {
  return (
    <div>
      <Fade cascade damping={0.1}>
        <Intro navigate="/api_list" text="API 살펴보기" />
        <HowToUse authority="user" />
        <Service />
        <Footer />
      </Fade>
    </div>
  );
}

export default PublicMain;
