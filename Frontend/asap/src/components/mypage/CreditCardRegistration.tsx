import React from 'react';
import './CreditCardRegistration.scss';
import { ReactComponent as Cross } from 'assets/icons/Cross2.svg';

function CreditCardRegistration() {
  return (
    <div className="ml-28 z-10">
      <div className="px-8 py-8 credit-modal border-2 rounded">
        {/* 카드정보 */}
        <div className="flex justify-between cross items-center">
          <p className="text-xl font-bold">카드정보</p>
          {/* 닫기버튼 */}
          <div className="mt-1 cursor-pointer">
            <Cross />
          </div>
        </div>
        {/* 카드번호 */}
        <div className="mt-2 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>카드번호</div>
          <div className="flex ">
            <input
              type="text"
              className="credit-input credit-input-number rounded text-center mx-1"
            />
            <input
              type="text"
              className="credit-input credit-input-number rounded text-center mx-1"
            />
            <input
              type="password"
              className="credit-input credit-input-number rounded text-center mx-1"
            />
            <input
              type="password"
              className="credit-input credit-input-number rounded text-center mx-1"
            />
          </div>
        </div>
        {/* 유효기간 */}
        <div className="mt-3 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>유효기간</div>
          <div className="flex justify-end items-center input-date">
            <div className="mr-2">
              <input
                type="text"
                placeholder="MM"
                className="date-input-1 mr-1 rounded"
              />
              월
            </div>
            <div>
              <input
                type="text"
                placeholder="YYYY"
                className="date-input-2 mr-1"
              />
              년
            </div>
          </div>
        </div>
        {/* 카드비밀번호 */}
        <div className="mt-3 flex justify-between">
          <div className="flex justify-between credit-input-box credit-input-half items-center border rounded-lg py-5 px-4">
            <div>카드비밀번호 앞2자리</div>
            <input type="password" className="pw-input rounded-lg" />
          </div>
          <div className="flex justify-between credit-input-box credit-input-half items-center border rounded-lg py-5 px-4">
            <div>CVC번호</div>
            <input type="password" className="pw-input rounded-lg" />
          </div>
        </div>
        {/* 주민등록번호 */}
        <div className="mt-3 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>주민등록번호 앞6자리</div>
          <div className="flex justify-end items-center input-date">
            <div className="mr-2" />
            <div>
              <input
                type="text"
                placeholder="여기에 입력해주세요"
                className="idnumber-input mr-1 rounded-lg pr-2"
              />
            </div>
          </div>
        </div>
        {/* 알림텍스트 */}
        <div className="mt-5 middle-text-box ml-2 text-xs font-bold">
          <div>
            * 등록된 카드로 <span className="text-red-600">매달 1일</span>{' '}
            서비스 이용 요금이 결제됩니다.
          </div>
          <div className="mt-1">
            * 마이 페이지 - 결제 수단 관리 카드 정보를 변경하실 수 있습니다.
          </div>
        </div>
        {/* 동의체크 */}
        <div className="check-box mt-6 ml-2 font-bold">
          <div className="">
            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="rounded w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600  dark:border-gray-600"
              />
              <p className="ml-2">개인정보 수집 및 이용 동의</p>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="rounded w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500 dark:focus:ring-blue-600  dark:border-gray-600"
              />
              <p className="ml-2">ASAP 유료서비스 이용 동의</p>
            </div>
          </div>
          <div className="flex justify-center mt-6 cursor-pointer">
            <div className="rounded bg-blue-700 text-white py-2 px-5 text-xs w-28 text-center font-bold">
              카드 등록
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

export default CreditCardRegistration;
