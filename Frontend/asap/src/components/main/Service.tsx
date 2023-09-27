import React from 'react';
import 'styles/main/Service.scss';
import { ReactComponent as Key } from 'assets/main/key.svg';
import { ReactComponent as BlockChain } from 'assets/main/Blockchain.svg';
import { ReactComponent as Chart } from 'assets/main/Chart.svg';
import { ReactComponent as WebChart } from 'assets/main/WebChart.svg';
import { ReactComponent as WebKey } from 'assets/main/WebKey.svg';
import { ReactComponent as WebBlock } from 'assets/main/WebBlock.svg';
import { Fade } from 'react-awesome-reveal';

function Service() {
  return (
    <div className="service-container">
      <Fade cascade damping={0.15}>
        <div className="service-title">ASAP에서는 가능합니다</div>
        <div className="service-content">
          <div className="service-text">
            <Key className="deco" />
            <div className="content-title">
              다양한 API를 <br />
              <span className="color-text">하나</span>의 개인키로
            </div>
            <div className="content-ex">
              다양한 종류의 API들을 ASAP에서 제공하는
              <br />
              개인키 하나로 편리하게 이용하실 수 있습니다
            </div>
          </div>
          <WebKey className="service-image" />
        </div>
        <div className="service-content">
          <WebBlock className="service-image" />
          <div className="service-text items-end">
            <div>
              <BlockChain className="deco" />
              <div className="content-title items-start">
                <span className="color-text">블록체인</span>을 사용하여 <br />
                사용량을 투명하게
              </div>
              <div className="content-ex">
                블록체인을 통해 사용량을 검증하고 <br />
                확인할 수 있습니다
              </div>
            </div>
          </div>
        </div>
        <div className="service-content">
          <div className="service-text">
            <Chart className="deco" />
            <div className="content-title">
              내가 제공하고 사용한
              <br /> <span className="color-text">API</span>를 한눈에
            </div>
            <div className="content-ex">
              ASAP에서 제공하는 통계를 통해
              <br />
              사용량을 편리하게 관리하고
              <br />
              비즈니스를 발전시킬 수 있습니다
            </div>
          </div>
          <WebChart className="service-image" />
        </div>
      </Fade>
    </div>
  );
}

export default Service;
