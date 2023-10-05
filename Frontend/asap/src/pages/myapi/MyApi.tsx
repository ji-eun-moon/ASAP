import React from 'react';
<<<<<<< HEAD
import SupplierApi from './SupplierApi';

function MyApi() {
  return (
    <div>
      <SupplierApi />
    </div>
  );
=======
import useAuthStore from 'store/auth/useAuthStore';
import UserApi from './UserApi';
import SupplierApi from './SupplierApi';

function MyApi() {
  const { loginType } = useAuthStore((state) => state);

  if (loginType === 'supplier') {
    return <SupplierApi />;
  }
  return <UserApi />;
>>>>>>> bdae4cd19b3e5e9747f97ac5a13eb2d4223c9cc0
}

export default MyApi;
