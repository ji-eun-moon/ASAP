import React, { ChangeEvent } from 'react';
import useSubmitApi from 'hooks/api/supply/useSubmitApi';
import Header from 'components/common/Header';
import SubmitTags from 'components/supply/SubmitTags';
import useSubmitStore from 'store/supply/useSubmitStore';
import SubmitInput from 'components/supply/SubmitInput';
import SubmitOutput from 'components/supply/SubmitOutput';
import Calendar from 'components/common/Calendar';
import { Button, Radio } from '@material-tailwind/react';
import 'styles/common/Input.scss';
import CodeEditor from 'components/supply/CodeEditor';

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
    inputExample,
    outputExample,
    setTitle,
    setContent,
    setPrice,
    setApi,
    setMethod,
    setInputExample,
    setOutputExample,
  } = useSubmitStore();

  const onTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      inputExample,
      outputExample,
    });
  };
  return (
    <div>
      <Header title="API 제공 신청하기" />
      <div className="container mx-auto page-container">
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">API 이름</p>
          <div className="input-container">
            <input placeholder="제목" value={title} onChange={onTitleHandler} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-5 pe-10">
            <p className="text-lg font-bold mb-2">Endpoint</p>
            <div className="input-container">
              <input
                placeholder="Endpoint"
                value={api}
                onChange={onApiHandler}
                className="pr-20"
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">Method</p>
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
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">상세 내용</p>
          <div className="input-container">
            <textarea
              placeholder="내용"
              value={content}
              onChange={onContentHandler}
              className="pr-20"
            />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">1회 요청당 비용</p>
            <div className="input-container flex w-96">
              <input
                placeholder="price"
                value={price}
                onChange={onPriceHandler}
                type="number"
                step="1"
              />
              <p className="self-center">원</p>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">제공 종료 날짜</p>
            <div>
              <Calendar />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-lg font-bold mb-2">관련 태그</p>
          <div>
            <SubmitTags />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">INPUT</p>
          <div>
            <SubmitInput />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">INPUT 예시</p>
          <div className="input-container">
            <CodeEditor setStore={setInputExample} />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">OUTPUT</p>
          <div>
            <SubmitOutput />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">OUTPUT 예시</p>
          <div className="input-container">
            <CodeEditor setStore={setOutputExample} />
          </div>
        </div>
        <div className="flex justify-center my-10">
          <Button ripple onClick={onSubmitHandler} className="text-lg bg-blue">
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApiSupply;
