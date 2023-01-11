import {request} from '@umijs/max';

export type Restaurant = {
  _id: string
  version: number
  last_updated: number
  currency: string
  name: string
  address: {
    address: string
    address2: string
    city: string
    state: string
    country: string
    zip_code: string
    location: Array<number>
  }
  is_active: boolean
  info?: string
  image_ids: Array<string>
  avatar_image_id: string
  price_range?: number
  rating?: string
  menu?: Array<any>
  phone: string
  website?: string
  owner_ids?: Array<any>
  tags: Array<any>
  supported_delivery?: {
    ubereats?: null
    grubhub?: null
    doordash?: null
    postmates?: null
  }
  supported_reservation?: {
    opentable?: null
    tock?: null
  },
  restaurant_id: string
  image_urls?: Array<string>
  avatar_image_url?: string
}

export type QueryParams = {
  current?: number
  pageSize?: number
  search_radius?: number
  search_location?: Array<number>
}

type RestaurantList = {
  data?: Restaurant[];
  errorMessage?: string;
}

/**
 * 查询餐厅列表
 * @param params
 */
export async function getRestaurants(params: QueryParams = {current: 1, pageSize: 20}) {
  const _params = {
    page_index: params.current,
    page_size: params.pageSize,
    search_location: [-121.958704, 37.33573],
    search_radius: 32186
  }

  return request<RestaurantList>('/api/restaurant/distance', {
    method: 'POST',
    data: _params
  });
}
