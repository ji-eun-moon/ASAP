import React, { ChangeEvent } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Input, Card } from '@material-tailwind/react';
import useInputStore from 'store/supply/useInputStore';
import useSubmitStore from 'store/supply/useSubmitStore';
import 'styles/common/Input.scss';

function SubmitInput() {
  const TABLE_HEAD = ['key', 'name', 'type', 'required', 'description'];
  const {
    key,
    name,
    required,
    type,
    description,
    pairs,
    jsonOutput,
    setKey,
    setName,
    setRequired,
    setType,
    setDescription,
    setPairs,
    setJsonOutput,
  } = useInputStore();

  const { setInput } = useSubmitStore();

  const handleAddPair = () => {
    const newIdx = pairs.length > 0 ? pairs[pairs.length - 1].idx + 1 : 1;
    setPairs([
      ...pairs,
      { idx: newIdx, key, name, type, required, description },
    ]);
    const jsonData = JSON.stringify(
      [...pairs, { idx: newIdx, key, name, type, required, description }],
      null,
      2,
    );
    console.log(jsonData);
    setJsonOutput(jsonData);
    setInput(jsonData);
    setKey('');
    setName('');
    setType('');
    setRequired('');
    setDescription('');
  };

  const onKeyHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const onNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onTypeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const onRequiredHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRequired(event.target.value);
  };

  const onDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Card className="w-full h-full container mx-auto">
      <div className="grid grid-cols-5">
        {TABLE_HEAD.map((head) => (
          <p key={head} className="col-span-1">
            {head}
          </p>
        ))}
      </div>
      <JsonTable jsonData={jsonOutput} />
      <div className="flex">
        <Input
          label="Key"
          value={key}
          onChange={onKeyHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="name"
          value={name}
          onChange={onNameHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="type"
          value={type}
          onChange={onTypeHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="Required"
          value={required}
          onChange={onRequiredHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="Description"
          value={description}
          onChange={onDescriptionHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <button
          type="button"
          className="font-bold text-3xl"
          onClick={handleAddPair}
        >
          +
        </button>
      </div>
      <div />
    </Card>
  );
}

export default SubmitInput;
