import {request} from '@umijs/max';
import {prefix} from "@/services/api/base";

/**
 * 退出登录接口
 * @param options
 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/outLogin', {
    prefix,
    method: 'POST',
    ...(options || {}),
  });
}

type SignInResult = {
  data: {
    access_token: string;
    expire: number;
    expire_type: string;
    token_type: string;
  }
  errorMessage?: string;
};

/**
 * 登录接口
 * @param body
 */
export async function signIn(body: { email?: string; password?: string; }) {
  return request<SignInResult>('/sign_in', {
    prefix,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body
  });
}
