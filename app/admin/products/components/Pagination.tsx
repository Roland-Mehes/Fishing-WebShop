'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Pagination = () => {
  const [inputValue, setInputValue] = useState('1');

  return (
    <div className="flex gap-1 justify-center items-center">
      <Button>{'<<'}</Button>
      <Button>{'<'}</Button>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-[4ch]"
      />{' '}
      din 500
      <Button>{'>'}</Button>
      <Button>{'>>'}</Button>
    </div>
  );
};

export default Pagination;
