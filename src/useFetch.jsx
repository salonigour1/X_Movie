import { useEffect, useState } from 'react';
import { fetchDataFromApi } from './utils/api';

const useFetch = (url) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setData('');
    setError(null);
    fetchDataFromApi(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => setError('Something went wrong'));
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
