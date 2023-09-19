import React from 'react';

interface IHeaderProps {
  title: string;
  children?: React.ReactNode;
}

function Header({ title, children }: IHeaderProps) {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-56 flex-col">
      <p className="text-5xl font-extrabold">{title}</p>
      <div>{children}</div>
    </div>
  );
}

Header.defaultProps = {
  children: null,
};

export default Header;
