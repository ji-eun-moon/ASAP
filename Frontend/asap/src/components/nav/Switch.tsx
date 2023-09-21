import React from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import { Chip } from '@material-tailwind/react';

function Switch() {
  const { isLoggedIn, loginType, setLoginType } = useAuthStore(
    (state) => state,
  );

  if (isLoggedIn) {
    return (
      <div className="flex flex-col">
        <div className="w-40 bg-gray-200 flex p-1 rounded-md">
          <button type="button" onClick={() => setLoginType('user')}>
            <Chip
              size="lg"
              value="사용자"
              className={`text-base text-black px-3 font-bold ${
                loginType === 'user' ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </button>
          <button type="button" onClick={() => setLoginType('supplier')}>
            <Chip
              size="lg"
              value="제공자"
              className={`text-base text-black font-bold ${
                loginType === 'supplier' ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Switch;
