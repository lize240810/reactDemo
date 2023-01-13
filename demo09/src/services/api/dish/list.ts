import {request} from '@umijs/max';

export type Dish = {
  _id: string
  version: number
  last_updated: number
  name: string
  restaurant_id: string
  restaurant_name: string
  description: string
  price: number
  categories: Array<string>
  rating: number
  address: {
    address: string
    address2: string
    city: string
    state: string
    country: string
    zip_code: string
    location: Array<number>
  },
  image_ids: Array<string>
  menu_id: string
  price_range: number
  is_active: boolean
  dish_id: string
  recommended_dish_post_id: Array<any>
  currency: string
  tags: Array<string>
  related_dish_id: Array<string>
  image_urls: Array<string>
}

export type DishList = {
  data?: Dish[];
  errorMessage?: string;
}

export type QueryParams = {
  id?: string
  pageSize?: number
  search_radius?: number
  search_location?: Array<number>
}

/**
 * 查询dish列表
 * @param params
 */
export async function getDish(params: QueryParams = {}) {
  return request<DishList>('/api/v2/all_dishes', {
    method: 'GET',
    params: {
      restaurant_id: params.id
    }
  });
}
