import { AxiosResponse } from 'axios';

import { Location } from '../datasets/Location';
import { UserRegister } from '../datasets/User';
import { APIRequest } from './APIRequest';

/*
form data:
(string) maxium_longitude (required)
(string) minium_longitude (required)
(string) maxium_latitude (required)
(string) minium_latitude (required)

(string) city (nullable)
(int) maxium_altitude (nullable)
(int) minium_altitude (nullable)
(array) location_tags (nullable)
(array) offer_facilities (nullable)
(array) ban_facilities (nullable)
(int) recommend 1: 熱門推薦 2: 官方推薦 (nullable)
(int) crowd 1: 空曠 2: 偶爾 3: 壅擠 (nullable)

locations data
counts 總筆數
*/

// http code 200
interface LocationListResponseI {
  locations: Location;
  counts: number;
}

export const apiUserLogin = (
  maxium_longitude?: number,
  maxium_latitude?: number,
  minium_longitude?: number,
  minium_latitude?: number,

  city?: string,
  maxium_altitude?: number,
  minium_altitude?: number,
  location_tags?: number[],
  offer_facilities?: number[],
  ban_facilities?: number[],
  recommand?: 1 | 2,
  crowd?: 1 | 2 | 3
): Promise<AxiosResponse<LocationListResponseI>> =>
  APIRequest().post('/location/coordinate_list', {
    maxium_longitude,
    maxium_latitude,
    minium_longitude,
    minium_latitude,
    city,
    maxium_altitude,
    minium_altitude,
    location_tags,
    offer_facilities,
    ban_facilities,
    recommand,
    crowd,
  });
