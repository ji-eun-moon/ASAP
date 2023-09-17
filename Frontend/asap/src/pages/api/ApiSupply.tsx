import React, { useState, ChangeEvent } from 'react';
import useSubmitApi from 'hooks/api/api/useSubmitApi';
import { Input, Button } from '@material-tailwind/react';

function ApiSupply() {
  const { submitApi } = useSubmitApi();

  // 입력값
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [api, setApi] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

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
    setTags([...tags, tag]);
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
    });
  };
  return (
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
      <Button ripple onClick={onTagsHandler}>
        태그 추가
      </Button>
      <Button ripple onClick={onSubmitHandler}>
        사용자 정보 입력
      </Button>
    </div>
  );
}

export default ApiSupply;
