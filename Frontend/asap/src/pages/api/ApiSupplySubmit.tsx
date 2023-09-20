import React, { ChangeEvent } from 'react';
import useSubmitApi from 'hooks/api/api/useSubmitApi';
import Header from 'components/common/Header';
import SubmitTags from 'components/supply/SubmitTags';
import useSubmitStore from 'store/supply/useSubmitStore';
import SubmitInput from 'components/supply/SubmitInput';
import SubmitOutput from 'components/supply/SubmitOutput';
import { Button, Radio } from '@material-tailwind/react';
import 'styles/common/Input.scss';

function ApiSupply() {
  const { submitApi } = useSubmitApi();

  const {
    title,
    content,
    input,
    output,
    price,
    api,
    tags,
    provideDate,
    method,
    setTitle,
    setContent,
    setPrice,
    setApi,
    setMethod,
  } = useSubmitStore();

  const onTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onPriceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPrice(value);
  };
  const onApiHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setApi(event.target.value);
  };

  const onMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value);
  };

  const onSubmitHandler = () => {
    submitApi({
      title,
      content,
      input,
      output,
      price,
      api,
      tags,
      provideDate,
      method,
    });
  };
  return (
    <div>
      <Header title="API 제공 신청하기" />
      <div className="container mx-auto">
        <div>
          <p className="text-lg font-extrabold">API 이름</p>
          <div className="input-container">
            <input placeholder="제목" value={title} onChange={onTitleHandler} />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">Endpoint</p>
          <div className="input-container">
            <input
              placeholder="api"
              value={api}
              onChange={onApiHandler}
              className="pr-20"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">상세 내용</p>
          <div className="input-container">
            <input
              placeholder="내용"
              value={content}
              onChange={onContentHandler}
              className="pr-20"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">1회 요청당 가격</p>
          <div className="input-container">
            <input
              placeholder="price"
              value={price}
              onChange={onPriceHandler}
              className="pr-20"
              type="number"
              step="1"
            />
          </div>
        </div>

        <div>
          <p className="text-lg font-extrabold">관련 태그</p>
          <div>
            <SubmitTags />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">INPUT</p>
          <div>
            <SubmitInput />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">OUTPUT</p>
          <div>
            <SubmitOutput />
          </div>
        </div>
        <div>
          <p className="text-lg font-extrabold">제공 만료 날짜</p>
        </div>
        <div>
          <p className="text-lg font-extrabold">Method</p>
          <div className="flex gap-10">
            <Radio
              name="type"
              color="blue"
              label="GET"
              defaultChecked
              onChange={onMethodChange}
              value="GET"
              crossOrigin=""
            />
            <Radio
              name="type"
              color="blue"
              label="POST"
              onChange={onMethodChange}
              value="POST"
              crossOrigin=""
            />
            <Radio
              name="type"
              color="blue"
              label="PUT"
              onChange={onMethodChange}
              value="PUT"
              crossOrigin=""
            />
            <Radio
              name="type"
              color="blue"
              label="DELETE"
              value="DELETE"
              onChange={onMethodChange}
              crossOrigin=""
            />
          </div>
        </div>
        <Button ripple onClick={onSubmitHandler}>
          API 제공 신청
        </Button>
      </div>
    </div>
  );
}

export default ApiSupply;
