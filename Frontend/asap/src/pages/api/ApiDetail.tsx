import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetApiDetail from 'hooks/api/api/useGetApiDetail';
import useCheckApply from 'hooks/api/api/useCheckApply';
import ApiTable from 'components/api/ApiTable';
import JsonName from 'components/api/JsonName';
import { Button } from '@material-tailwind/react';
import CategoryImg from 'components/api/CategoryImg';
import 'styles/api/ApiDetail.scss';

function ApiDetail() {
  const authToken = sessionStorage.getItem('authToken');
  const navigate = useNavigate();
  const [apply, setApply] = useState<string>('');
  const { apiId, apiDetail } = useGetApiDetail();
  const { checkApply } = useCheckApply();

  useEffect(() => {
    const fetchApply = async () => {
      if (authToken) {
        const check = await checkApply(apiId);
        setApply(check);
      }
    };

    fetchApply();
  }, [authToken, checkApply, apiId]);

  const onListHandler = () => {
    navigate('/api_list', { state: { category: apiDetail?.category } });
  };

  // 표 데이터
  const headers = ['API', 'API 출처', '제공데이터', '비고'];
  const data = [
    [
      apiDetail?.title,
      apiDetail?.memberName,
      <JsonName jsonData={apiDetail?.output} />,
      '',
    ],
  ];

  return (
    <div className="container mx-auto page-container">
      {/* 현재 페이지 위치 정보 */}
      <div className="page-info">
        <Link to="/">HOME</Link>&nbsp;{'>'}&nbsp;
        <Link to="/api_list">APIs</Link>&nbsp;{'>'}&nbsp;
        <button type="button" onClick={onListHandler}>
          {apiDetail?.category}
        </button>
        &nbsp;
        {'>'}
        &nbsp;
        <span>{apiDetail?.title}</span>
      </div>

      {/* API 설명 */}
      <div className="api-info">
        <div className="flex justify-center" style={{ flex: '3' }}>
          <CategoryImg category={apiDetail?.category} />
        </div>
        <div style={{ flex: '7' }}>
          <div className="api-title">{apiDetail?.title}</div>
          <div className="pb-10">
            {apiDetail?.tags &&
              JSON.parse(apiDetail.tags).map((tag: string) => (
                <span key={tag} className="tag">
                  #{tag}&nbsp;
                </span>
              ))}
          </div>
          <div className="text-lg">{apiDetail?.content}</div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="buttons">
        <Button className="api-button">
          <Link to={`/api_list/${apiId}/usage`}>API 사용법</Link>
        </Button>
        {!authToken || apply === 'NOT_REGISTERED_API' ? (
          <Button className="api-button">
            <Link to={`/api_list/${apiId}/apply`}>API 신청하기</Link>
          </Button>
        ) : (
          <Button className="api-button">
            <Link to={`/api_list/${apiId}/test`}>API 테스트</Link>
          </Button>
        )}
      </div>

      {/* API 데이터 설명 */}
      <div className="text-3xl font-bold pb-3">API 데이터</div>
      <div />
      <ApiTable headers={headers} data={data} />
    </div>
  );
}

export default ApiDetail;
