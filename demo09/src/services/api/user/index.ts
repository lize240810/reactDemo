import {request} from '@umijs/max';
import {prefix} from "@/services/api/base";

export type CurrentUser = {
  admin: boolean;
  bio?: string
  biz_owner: boolean
  city: string
  country: string
  disabled: boolean
  display_name?: string
  last_active: number
  profile_photo?: string
  state: string
  time_created: number
  user_id: string
  verified: boolean
};

/**
 * 获取当前的用户
 * @param options
 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{ data: CurrentUser }>('/user/me', {
    prefix,
    method: 'GET',
    ...(options || {}),
  });
}
