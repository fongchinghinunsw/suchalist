import { List } from '@common/types/list';
import { useEffect, useState } from 'react';

export function useList(id: string) {
  const [list, setList] = useState<List | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await window.database.getList(id);
        console.log({ list });
        setList(list);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch list');
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [id]);

  return { list, loading, error };
}
