export interface User {
  id: number;
  type: number;
  verified_status: number;
  phone_cell: string | null;
  email: string;
  image: string | null;
  nickname: string | null;
  share_download_count: number;
  share_link: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRegister {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}
