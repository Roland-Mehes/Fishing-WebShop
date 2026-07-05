'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const BulkActionSelector = () => {
  const [selectedAction, setSelectedAction] = useState('');

  const executeAction = () => {
    console.log(selectedAction);
  };

  return (
    <div className="flex gap-2 ">
      <Select value={selectedAction} onValueChange={setSelectedAction}>
        <SelectTrigger>
          <SelectValue placeholder="Válassz műveletet" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem className="hover:bg-muted" value="delete">
            Törlés
          </SelectItem>
          <SelectItem className="hover:bg-muted" value="archive">
            Archiválás
          </SelectItem>
          <SelectItem className="hover:bg-muted" value="duplicate">
            Másolás
          </SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={executeAction} disabled={!selectedAction}>
        Végrehajtás
      </Button>
    </div>
  );
};

export default BulkActionSelector;
