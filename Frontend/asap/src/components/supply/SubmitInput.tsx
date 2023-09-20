import React, { ChangeEvent } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Card } from '@material-tailwind/react';
import useInputStore from 'store/supply/useInputStore';
import useSubmitStore from 'store/supply/useSubmitStore';
import 'styles/common/Input.scss';
import { ReactComponent as Add } from 'assets/icons/Add.svg';

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
    <div className="flex">
      <Card className="w-full h-full container mx-auto p-5 bg-gray-200">
        <div className="grid grid-cols-5 bg-gray-200">
          {TABLE_HEAD.map((head) => (
            <p key={head} className="col-span-1 p-2 font-bold text-xl h-11">
              {head}
            </p>
          ))}
        </div>
        <hr className="h-0.5 bg-gray-500" />
        <JsonTable jsonData={jsonOutput} />
        <div className="grid grid-cols-5">
          <div className="table-input-container">
            <input placeholder="key" value={key} onChange={onKeyHandler} />
          </div>
          <div className="table-input-container">
            <input placeholder="name" value={name} onChange={onNameHandler} />
          </div>
          <div className="table-input-container">
            <input placeholder="type" value={type} onChange={onTypeHandler} />
          </div>
          <div className="table-input-container">
            <input
              placeholder="required"
              value={required}
              onChange={onRequiredHandler}
            />
          </div>
          <div className="table-input-container">
            <input
              placeholder="description"
              value={description}
              onChange={onDescriptionHandler}
            />
          </div>
        </div>
      </Card>
      <div className="flex items-end">
        <Add type="button" onClick={handleAddPair} className="w-6 my-5 ms-5" />
      </div>
    </div>
  );
}

export default SubmitInput;
