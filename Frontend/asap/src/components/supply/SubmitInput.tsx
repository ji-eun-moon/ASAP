import React, { ChangeEvent, useState } from 'react';
import JsonTable from 'components/common/JsonTable';
import { Card } from '@material-tailwind/react';
import useInputStore from 'store/supply/useInputStore';
import useSubmitStore from 'store/supply/useSubmitStore';
import 'styles/common/Input.scss';
import { ReactComponent as Add } from 'assets/icons/Add.svg';

function SubmitInput() {
  const [isChecked, setIsChecked] = useState(false);

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
    toggleRequired,
    resetRequired,
    setType,
    setDescription,
    setPairs,
    setJsonOutput,
  } = useInputStore();

  const { setInput } = useSubmitStore();

  // input 쌍 추가
  const handleAddPair = () => {
    // 새로운 인덱스 설정
    const newIdx = pairs.length > 0 ? pairs[pairs.length - 1].idx + 1 : 1;

    // 값 추가해서 스토어에 저장
    setPairs([
      ...pairs,
      { idx: newIdx, key, name, type, required, description },
    ]);

    // JSON 문자열으로 변환
    const jsonData = JSON.stringify(
      [...pairs, { idx: newIdx, key, name, type, required, description }],
      null,
      2,
    );

    setJsonOutput(jsonData); // 스토어에 저장
    setInput(jsonData); // 제출할 데이터에 저장
    console.log(jsonData);

    // 저장 후 값 초기화
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

        {/* 추가한 input 쌍 */}
        <JsonTable jsonData={jsonOutput} />

        {/* input 쌍 추가 */}
        <div className="grid grid-cols-12">
          <div className="table-input-container col-span-2">
            <input placeholder="key" value={key} onChange={onKeyHandler} />
          </div>
          <div className="table-input-container col-span-2">
            <input placeholder="name" value={name} onChange={onNameHandler} />
          </div>
          <div className="table-input-container col-span-2">
            <input placeholder="type" value={type} onChange={onTypeHandler} />
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

      {/* Input 쌍 추가 버튼 */}
      <div className="flex items-end">
        <Add type="button" onClick={handleAddPair} className="w-6 my-5 ms-5" />
      </div>
    </div>
  );
}

export default SubmitInput;
