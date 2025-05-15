import { type RequestListProps } from "../types";
import { type RequestType } from "../types";
import { type RequestProps } from "../types";
import Request from "./Request";
function RequestList(props: RequestListProps ) {
  const {requestsArray} = props;
  //console.log(requestsArray)
  return (
    <>
    <ul>
      {requestsArray.map((request, index) => <li key={index}><Request props={request}></Request></li>
      )}
    </ul>
    </>
  )
}

export default RequestList