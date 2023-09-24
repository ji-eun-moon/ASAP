import React, { ChangeEvent, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from 'components/common/Header';
import { Button } from '@material-tailwind/react';
import 'styles/common/Input.scss';
import 'styles/member/ApiApply.scss';
import useSetUserInfo from 'hooks/api/api/useSetUserInfo';
// import { useLocation } from 'react-router';

function ApiApply() {
  // const location = useLocation();
  const { setUserInfo } = useSetUserInfo();
  // const { apiId } = useParams() as { apiId: string };
  // const apiTitle = location.state;

  // 사용자 신청 후 입력 받아야하는 값
  // const [apiTitle, setTitle] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const industrys = ['제조업', '서비스업', '금융업', '유통업', '기타'];

  const [industry, setIndustry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onOpenHandler = () => {
    setIsOpen(!isOpen);
  };
  const onChengeItemHandler = (data: string) => {
    setIndustry(data);
    setIsOpen(false);
  };

  // const onTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };
  const onPurposeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPurpose(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (!purpose) {
      alert('목적을 입력해주세요.');
      return;
    }
    if (!industry) {
      alert('산업군을 입력해주세요.');
      return;
    }
    await setUserInfo({
      apiId: '6',
      purpose,
      industry,
    });
  };
  return (
    <div>
      <Header title="API 사용 신청하기" />
      <div className="container mx-auto page-container flex flex-col justify-center items-center">
        <div className="contain">
          <p className="text-lg font-bold mb-2 pt-1">API 이름</p>
          <div className="inputcontain">
            <input
              placeholder="제목"
              type="text"
              // value={apiTitle}
              // onChange={onTitleHandler}
            />
          </div>
        </div>
        <div className="contain">
          <p className="text-lg font-bold mb-2 pt-1">사용 목적</p>
          <div className="inputcontain">
            <textarea
              placeholder="사용 목적"
              value={purpose}
              onChange={onPurposeHandler}
            />
          </div>
        </div>

        <div className="contain">
          <p className="text-lg font-bold mb-2">직업군</p>
          <div className="industrycontain">
            <div
              aria-hidden="true"
              className="dropdown-box"
              onClick={() => {
                onOpenHandler();
              }}
            >
              {industry}
              <div className="arrow">▼</div>
            </div>
            {isOpen ? (
              <div className="select-wrapper z-50">
                {industrys.map((data) => (
                  <div
                    key={data}
                    aria-hidden="true"
                    className="select-options"
                    onClick={() => {
                      onChengeItemHandler(data);
                    }}
                  >
                    {data}
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className=" flex justify-center my-10">
          <Button
            ripple
            onClick={onSubmitHandler}
            className="submitButton text-lg bg-blue"
          >
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApiApply;
