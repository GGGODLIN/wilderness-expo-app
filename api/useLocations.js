import { useQuery } from 'react-query';
import { APIRequest } from './APIRequest';

const useLocations = () => {
  return useQuery(
    ['location-list'],
    () => {
      const params = new URLSearchParams();

      return APIRequest().get(`/location/list?` + params.toString());
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
};

export default useLocations;
