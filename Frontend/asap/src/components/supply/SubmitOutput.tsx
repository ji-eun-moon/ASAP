import React, { ChangeEvent } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Input, Card } from '@material-tailwind/react';
import useOutputStore from 'store/supply/useOutputStore';
import useSubmitStore from 'store/supply/useSubmitStore';

function SubmitOutput() {
  const TABLE_HEAD = ['key', 'name', 'type', 'required', 'description'];
  const {
    key,
    name,
    type,
    required,
    description,
    pairs,
    jsonOutput,
    setKey,
    setName,
    setType,
    setRequired,
    setDescription,
    setPairs,
    setJsonOutput,
  } = useOutputStore();

  const { setOutput } = useSubmitStore();

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
    setJsonOutput(jsonData);
    setOutput(jsonData);
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

  const onDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onRequiredHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRequired(event.target.value);
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
          label="Name"
          value={name}
          onChange={onNameHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <Input
          label="Type"
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
          onClick={handleAddPair}
          className="font-bold text-3xl"
        >
          +
        </button>
      </div>
      <div />
    </Card>
  );
}

export default SubmitOutput;
