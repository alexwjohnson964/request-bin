export interface CreateBasketProps {
  onCreate: () => void
}

export interface BasketType {
  basket_url: string
}

export interface BasketListProps  {
  baskets: Array<BasketType>,
  setCurrentBasketURL: (url: string) => void;
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