import { useQuery } from 'react-query';
import { APIRequest } from './APIRequest';

const useCoordinateList = ({ region }) => {
  return useQuery(
    ['coordinate-list', region?.latitude, region?.longitude],
    () => {
      const params = new URLSearchParams();
      params.append('maxium_longitude', region?.longitude + region?.longitudeDelta);
      params.append('minium_longitude', region?.longitude);
      params.append('maxium_latitude', region?.latitude + region?.latitudeDelta);
      params.append('minium_latitude', region?.latitude);
      return APIRequest().get(`/location/coordinate_list?` + params.toString());
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
};

export default useCoordinateList;
