import { useQuery } from 'react-query';
import { APIRequest } from './APIRequest';

const useFacilitiesList = () => {
  return useQuery(
    ['facilities-list'],
    () => {
      return APIRequest().get(`/all_facilities_list`);
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
};

export default useFacilitiesList;
