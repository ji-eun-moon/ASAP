import React, { ChangeEvent } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Input, Card } from '@material-tailwind/react';
import usePairStore from 'store/supply/usePairStore';

function InputValues() {
  const TABLE_HEAD = ['key', 'name', 'type', 'description'];
  const {
    key,
    name,
    type,
    description,
    pairs,
    setKey,
    setName,
    setType,
    setDescription,
    setPairs,
    setJsonOutput,
  } = usePairStore();

  const handleAddPair = () => {
    const newId = pairs.length > 0 ? pairs[pairs.length - 1].id + 1 : 1;
    setPairs([...pairs, { id: newId, key, name, type, description }]);
    const jsonData = JSON.stringify(
      [...pairs, { id: newId, key, name, type, description }],
      null,
      2,
    );
    setJsonOutput(jsonData);
    setKey('');
    setName('');
    setType('');
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

  return (
    <Card className="w-full h-full">
      <div className="grid grid-cols-4">
        {TABLE_HEAD.map((head) => (
          <p key={head} className="col-span-1">
            {head}
          </p>
        ))}
      </div>
      <JsonTable />
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
          label="Description"
          value={description}
          onChange={onDescriptionHandler}
          className="pr-20"
          containerProps={{
            className: 'min-w-0',
          }}
          crossOrigin=""
        />
        <button type="button" onClick={handleAddPair}>
          +
        </button>
      </div>
      <div />
    </Card>
  );
}

export default InputValues;
