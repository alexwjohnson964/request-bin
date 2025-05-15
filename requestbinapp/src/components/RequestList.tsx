import { type RequestListProps } from "../types";
import { type RequestType } from "../types";
//import { type RequestProps } from "../types";
import Request from "./Request";
function RequestList(props: RequestListProps ) {
  const {requestsArray} = props;
  function sortRequests(a: RequestType,b: RequestType) {
    const dateA = new Date(a.time_stamp).valueOf();
    const dateB = new Date(b.time_stamp).valueOf();
    console.log(dateA, dateB)
    return dateB - dateA;
  }
  requestsArray.sort(sortRequests)
  
  return (
    <>
    <ul>
      {requestsArray.map((request, index) => <li key={index}><Request request={request}></Request></li>
      )}
    </ul>
    </>
  )
}

export default RequestList