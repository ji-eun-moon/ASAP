import React from 'react';
import UserApi from './UserApi';
import SupplierApi from './SupplierApi';

function MyApi() {
  return (
    <div>
      MyApi
      <UserApi />
      <SupplierApi />
    </div>
  );
}

export default MyApi;
