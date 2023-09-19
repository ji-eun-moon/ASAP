import React, { ChangeEvent } from 'react';
import useSubmitApi from 'hooks/api/api/useSubmitApi';
import Header from 'components/common/Header';
import InputTags from 'components/supply/InputTags';
import { Input, Button } from '@material-tailwind/react';
import useSupplyStore from 'store/supply/useSupplyStore';
import InputValues from 'components/supply/InputValues';

function ApiSupply() {
  const { submitApi } = useSubmitApi();

  const {
    title,
    content,
    input,
    output,
    price,
    api,
    tag,
    tags,
    provideDate,
    method,
    setTitle,
    setContent,
    setInput,
    setOutput,
    setPrice,
    setApi,
    setTag,
    setTags,
  } = useSupplyStore();

  const onTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const onInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const onOutputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOutput(event.target.value);
  };
  const onPriceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPrice(value);
  };
  const onApiHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setApi(event.target.value);
  };
  const onTagHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };
  const onTagsHandler = () => {
    setTags(tag);
    setTag('');
    console.log(tags);
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
        <div className="flex">
          <p>API 제목</p>
          <div>
            <Input
              label="제목"
              value={title}
              onChange={onTitleHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>상세 내용</p>
          <div>
            <Input
              label="내용"
              value={content}
              onChange={onContentHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>1회 요청당 가격</p>
          <div>
            <Input
              label="price"
              value={price}
              onChange={onPriceHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>API 주소</p>
          <div>
            <Input
              label="api"
              value={api}
              onChange={onApiHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>관련 태그</p>
          <div>
            <Input
              label="tag"
              value={tag}
              onChange={onTagHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>INPUT</p>
          <div>
            <Input
              label="input"
              value={input}
              onChange={onInputHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <div className="flex">
          <p>OUTPUT</p>
          <div>
            <Input
              label="output"
              value={output}
              onChange={onOutputHandler}
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin=""
            />
          </div>
        </div>
        <Button ripple onClick={onTagsHandler}>
          태그 추가
        </Button>
        <Button ripple onClick={onSubmitHandler}>
          사용자 정보 입력
        </Button>
      </div>
      <InputTags />
      <InputValues />
    </div>
  );
}

export default ApiSupply;
