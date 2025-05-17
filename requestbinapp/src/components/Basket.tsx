import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getBasket } from "../apiService";
import { type RequestType } from "../types";
import RequestList from "./RequestList";

function Basket() {
  const { url } = useParams<{ url: string }>();
  const navigate = useNavigate();
  const [requestsList, setRequestsList] = useState<Array<RequestType>>([]);
  // const {url, setCurrentBasketURL} = props;
  useEffect(() => {
    updateRequestList();
  }, [])

  async function updateRequestList() {
    // this doesn't actually validate if the url entered is an existing basket
    if (!url) return <p>Invalid basket URL</p>
    const requestList = await getBasket(url);
    setRequestsList(requestList.requests);
  }
  
  return (
    <>
      <button onClick={() => navigate('/')}>Home</button>
      <h2>Basket: {url}</h2>
      <div>Send requests to <a>/{url}</a></div><br></br>
      <div>This basket can be viewed at <a>/baskets/{url}</a></div>
      <h3>Request count: {requestsList.length}</h3>
      <RequestList requestsArray = {requestsList}/>
    </>
  )
}

export default Basket