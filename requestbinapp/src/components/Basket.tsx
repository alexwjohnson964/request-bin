import { useState, useEffect } from "react";
import BasketList from "./BasketList";
import { getBasket } from "../apiService";
import { type BasketProps } from "../types";
import { type RequestType } from "../types";
import RequestList from "./RequestList";

function Basket(props: BasketProps) {
  const [requestsList, setRequestsList] = useState<Array<RequestType>>([]);
  const {url} = props;
  useEffect(() => {
    updateRequestList();
  }, [])

  async function updateRequestList() {
    const requestList = await getBasket(url);
    setRequestsList(requestList.requests);
  }

  
  return (
    <>
    {/* <button onClick={() => }>Home</button> */}
    <h2>Basket: {url}</h2>
    <div>Requests are collected at {url}</div>
    <h3>Request count: {requestsList.length}</h3>
    <RequestList requestsArray = {requestsList}/>
    </>
  )
}


export default Basket