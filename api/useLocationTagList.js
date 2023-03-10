import { useQuery } from 'react-query';
import { APIRequest } from './APIRequest';

const useLocationTagList = () => {
  return useQuery(
    ['location_tag_list'],
    () => {
      return APIRequest().get(`/all_location_tag_list`);
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
};

export default useLocationTagList;
