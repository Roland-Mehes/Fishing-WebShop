'use client';

import { Button } from './ui/button';
import { User } from 'lucide-react';
const ClientButton = () => {
  return (
    <Button variant="ghost" size="icon" onClick={() => alert('tap')}>
      <User />
    </Button>
  );
};

export default ClientButton;
