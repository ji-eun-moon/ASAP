import React, { useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import useSetUserInfo from 'hooks/api/api/useSetUserInfo';
import { Input, Button } from '@material-tailwind/react';

function ApiApply() {
  const { setUserInfo } = useSetUserInfo();
  const { apiId } = useParams() as { apiId: string };

  // 사용자 신청 후 입력 받아야하는 값
  const [purpose, setPurpose] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');

  const onPurposeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPurpose(event.target.value);
  };

  const onUnitHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const onIndustryHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIndustry(event.target.value);
  };

  const onSubmitHandler = async () => {
    if (!purpose) {
      alert('목적을 입력해주세요.');
      return;
    }
    if (!unit) {
      alert('구분을 입력해주세요.');
      return;
    }
    if (!industry) {
      alert('산업군을 입력해주세요.');
      return;
    }
    await setUserInfo({
      apiId,
      purpose,
      unit,
      industry,
    });
  };

  return (
    <div>
      ApiApply
      <Input
        label="목적"
        value={purpose}
        onChange={onPurposeHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        crossOrigin=""
      />
      <Input
        label="구분"
        value={unit}
        onChange={onUnitHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        crossOrigin=""
      />
      <Input
        label="산업군"
        value={industry}
        onChange={onIndustryHandler}
        className="pr-20"
        containerProps={{
          className: 'min-w-0',
        }}
        crossOrigin=""
      />
      <Button ripple onClick={onSubmitHandler}>
        사용자 정보 입력
      </Button>
    </div>
  );
}

export default ApiApply;
