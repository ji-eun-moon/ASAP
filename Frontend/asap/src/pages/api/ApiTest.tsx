import React, { useEffect, useState } from 'react';
import useGetApiUsage from 'hooks/api/api/useGetApiUsage';
import useApiTest from 'hooks/api/api/useApiTest';
import useFormattedJson from 'hooks/custom/useFormattedJson';
import useAuthStore from 'store/auth/useAuthStore';
import useQueryParamsStore from 'store/api/queryParamsStore';
import useTestStore from 'store/api/useTestStore';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { Button, Card } from '@material-tailwind/react';
import Modal from 'components/common/Modal';
import Editor from '@monaco-editor/react';
import 'styles/api/ApiTest.scss';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

function ApiTest() {
  const { apiUsage } = useGetApiUsage();
  const { isLoggedIn } = useAuthStore();
  const { params, setParam } = useQueryParamsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState<Pair[]>([]);
  const { apiTest } = useApiTest();
  const { testResponse, status } = useTestStore();
  const { formattedJson, dynamicHeight } = useFormattedJson(testResponse);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editorOptions = {
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };

  useEffect(() => {
    try {
      if (apiUsage?.input) {
        const parsedData = JSON.parse(apiUsage?.input);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  }, [apiUsage?.input]);

  if (!data || data.length === 0) {
    return null;
  }

  const onApiTest = () => {
    const url = apiUsage?.api;
    const newUrl = url?.replace('/asap/', '/test/');
    if (!isLoggedIn) {
      setModalMessage('로그인이 필요한 서비스입니다.');
      setIsModalOpen(true);
      return;
    }
    apiTest({ url: newUrl, params });
    console.log(params);
  };

  const columns = Object.keys(data[0]).filter(
    (column) => column === 'key' || column === 'type',
  ) as (keyof Pair)[];

  // 복사 함수
  const handleCopyClipBoard = async (text: string | '') => {
    try {
      await navigator.clipboard.writeText(text);
      setModalMessage('클립보드에 복사되었습니다.');
      setIsModalOpen(true);
    } catch (e) {
      setModalMessage('복사에 실패하였습니다.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto page-container">
      {/* 헤더 */}
      <div className="mb-8">
        <p className="font-bold text-4xl">{apiUsage?.title}</p>
        <p className="text-gray-600 mt-1">{apiUsage?.api}</p>
      </div>

      {/* 무료 테스트 횟수 */}
      <div className="flex justify-end">
        <div className="font-bold text-lg">무료 테스트 98/100 회</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Query Params */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-blue">Query Params</div>
          <Card className="p-5 bg-gray-200">
            {data.map((item) => (
              <div
                key={item.idx}
                className="flex items-center mt-3 grid grid-cols-3"
              >
                {columns.map((column) => (
                  <pre key={column} className="ps-2 font-semibold col-span-1">
                    {item[column]}
                  </pre>
                ))}
                <div
                  className={`input-container col-span-1 custom-input ${
                    item.required === 'true' ? 'required' : ''
                  }`}
                >
                  <input
                    placeholder={item.key}
                    value={params[item.key] || ''}
                    onChange={(e) => setParam(item.key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </Card>

          <div className="flex justify-center my-8">
            <Button
              ripple
              className="bg-blue text-base w-44"
              onClick={onApiTest}
            >
              TEST
            </Button>
          </div>
        </div>

        {/* Response */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-blue">Response</div>

          <div className="bg-gray-300 rounded-lg p-5 flex gap-5 items-center">
            <div
              className={`w-5 h-5 rounded-full ${
                status && status.toString().startsWith('2')
                  ? 'bg-green-600'
                  : 'bg-red-600'
              }`}
            />
            <div className="font-bold">{status}</div>
          </div>

          {/* Result */}
          <div className="bg-gray-300 rounded-lg p-5">
            <div className="flex justify-between items-center mb-3">
              <div className="text-xl font-bold">Result</div>
              <div>
                <Copy
                  className="w-5 h-auto me-1 cursor-pointer"
                  onClick={() => {
                    handleCopyClipBoard(formattedJson);
                  }}
                />
              </div>
            </div>
            <div className="rounded-editor">
              <Editor
                height={dynamicHeight}
                language="json"
                value={formattedJson}
                theme="vs-dark"
                options={editorOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        confirm
        message={modalMessage}
      />
    </div>
  );
}

export default ApiTest;
