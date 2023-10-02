import React from 'react';

interface ApiInfo {
  title: string;
  apiId: number;
}

interface DropdownProps {
  options: ApiInfo[] | null;
  apiTitle: string | null;
  onSelect: (selectedTitle: string) => void;
}

function Dropdown({ options, apiTitle, onSelect }: DropdownProps) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <select
      value={apiTitle || ''}
      onChange={handleSelect}
      className="appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
    >
      <option value="" disabled>
        API를 선택하세요
      </option>
      {options?.map((option) => (
        <option key={option.apiId} value={option.title}>
          {option.title}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
