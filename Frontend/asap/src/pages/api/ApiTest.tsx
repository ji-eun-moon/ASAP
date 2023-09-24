import React, { useEffect, useState } from 'react';
import useGetApiUsage from 'hooks/api/api/useGetApiUsage';
import { Button, Card } from '@material-tailwind/react';
import useAuthStore from 'store/auth/useAuthStore';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import PrettyJson from 'components/common/PrettyJson';
import Modal from 'components/common/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Pair[]>([]);

  const closeModal = () => {
    setIsModalOpen(false);
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
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스 입니다.');
      return;
    }
    console.log('API 테스트');
  };

  const columns = Object.keys(data[0]).filter(
    (column) => column === 'key' || column === 'type',
  ) as (keyof Pair)[];

  // 복사 함수
  const handleCopyClipBoard = async (text: string | '') => {
    try {
      await navigator.clipboard.writeText(text);
      setIsModalOpen(true);
    } catch (e) {
      setIsModalOpen(true);
      alert('복사에 실패하였습니다');
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
                <div className="input-container col-span-1">
                  <input placeholder={item.key} />
                </div>
              </div>
            ))}
          </Card>

          <div className="flex justify-center my-8">
            <Button ripple className="bg-blue" onClick={onApiTest}>
              TEST
            </Button>
          </div>
        </div>

        {/* Response */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-blue">Response</div>

          <div className="bg-gray-300 rounded-lg p-5 flex gap-5 items-center">
            <div className="bg-green-600 w-5 h-5 rounded-full" />
            <div>200</div>
          </div>

          {/* Result */}
          <div className="bg-gray-300 rounded-lg p-5">
            <div className="flex justify-end">
              {apiUsage && (
                <Copy
                  className="w-5 h-auto me-2 cursor-pointer"
                  onClick={() => {
                    handleCopyClipBoard(apiUsage.outputExample);
                  }}
                />
              )}
            </div>
            <PrettyJson jsonData={apiUsage?.outputExample} />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-96">
          <div className="flex justify-start">
            <p className="text-lg mt-5 font-bold">클립보드에 복사되었습니다.</p>
          </div>
          <div className="flex flex-row-reverse my-5">
            <Button ripple onClick={closeModal} className="bg-blue-500">
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ApiTest;
