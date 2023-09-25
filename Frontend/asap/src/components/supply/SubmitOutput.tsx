import React, { ChangeEvent, useState } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Card } from '@material-tailwind/react';
import useOutputStore from 'store/supply/useOutputStore';
import useSubmitStore from 'store/supply/useSubmitStore';
import 'styles/common/Input.scss';
import { ReactComponent as Add } from 'assets/icons/Add.svg';

function SubmitOutput() {
  const [isChecked, setIsChecked] = useState(false);
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
    toggleRequired,
    resetRequired,
    setDescription,
    setPairs,
    setJsonOutput,
  } = useOutputStore();

  const { setOutput } = useSubmitStore();

  const handleAddPair = () => {
    // 인덱스 추가
    const newIdx = pairs.length > 0 ? pairs[pairs.length - 1].idx + 1 : 1;

    // output 쌍 추가
    setPairs([
      ...pairs,
      { idx: newIdx, key, name, type, required, description },
    ]);

    // JSON 문자열로 변환
    const jsonData = JSON.stringify(
      [...pairs, { idx: newIdx, key, name, type, required, description }],
      null,
      2,
    );

    setJsonOutput(jsonData); // 스토어에 저장
    setOutput(jsonData); // 제출 데이터에 저장

    // 입력 값 초기화
    setKey('');
    setName('');
    setType('');
    setIsChecked(false);
    resetRequired();
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

  const onDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onToggleRequired = () => {
    toggleRequired();
    setIsChecked(!isChecked);
  };

  const headGrid = (head: string) => {
    if (head === 'description') {
      return 'col-span-5';
    }
    if (head === 'required') {
      return 'col-span-1';
    }
    return 'col-span-2';
  };

  return (
    <div className="flex">
      <Card className="w-full h-full container mx-auto p-5 bg-gray-200">
        {/* 표 헤더 */}
        <div className="grid grid-cols-12 bg-gray-200">
          {TABLE_HEAD.map((head) => (
            <div
              key={head}
              className={`${headGrid(head)} p-2 font-bold text-xl h-11`}
            >
              {head}
            </div>
          ))}
        </div>
        <hr className="h-0.5 bg-gray-500" />

        {/* 추가한 output 쌍 */}
        <JsonTable jsonData={jsonOutput} />

        {/* output 쌍 추가 */}
        <div className="grid grid-cols-12">
          <div className="table-input-container col-span-2">
            <input
              placeholder="key"
              value={key}
              onChange={onKeyHandler}
              className="w-5"
            />
          </div>
          <div className="table-input-container col-span-2">
            <input
              placeholder="name"
              value={name}
              onChange={onNameHandler}
              className="w-5"
            />
          </div>
          <div className="table-input-container col-span-2">
            <input
              placeholder="type"
              value={type}
              onChange={onTypeHandler}
              className="w-5"
            />
          </div>
          <div className="table-input-container col-span-1">
            <div className="flex justify-center w-full">
              <div>
                <input
                  type="checkbox"
                  color="blue"
                  checked={isChecked}
                  onChange={onToggleRequired}
                  className="bg-white w-7"
                />
              </div>
            </div>
          </div>
          <div className="table-input-container col-span-5">
            <textarea
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

export default SubmitOutput;
