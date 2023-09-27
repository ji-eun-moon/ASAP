import React from 'react';
import Intro from 'components/main/Intro';
import HowToUse from 'components/main/HowToUse';
import Footer from 'components/common/Footer';

function SupplierMain() {
  return (
    <div>
      <Intro navigate="/supply/submit" text="API 제공 신청하기" />
      <HowToUse authority="supplier" />
      <Footer />
    </div>
  );
}

export default SupplierMain;
