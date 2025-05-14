
export interface BasketType {
  url: string
}

export interface BasketListProps  {
  baskets: Array<BasketType>
}

export interface RequestType {
  method: string,
  path: string,
  queryParams?: string, 
  headers: string,
  body?: string
}

export interface BasketProps {
  url: string
}

export interface RequestListProps {
  requestsArray: Array<RequestType>
}

export interface PostRequestDetails {
  headers: string,
  body: string
}

export interface GetRequestDetails {
  queryParams?: string, 
  headers: string,
}

export type RequestDetails = PostRequestDetails | GetRequestDetails;