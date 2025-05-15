import RequestDetail from "./RequestDetail";
import { type RequestProps } from "../types";

function Request(props: RequestProps) {
  const {request} = props
  const {method, path, time_stamp} = request;
  let requestDetails;
  function formatTimeStamp(){
    const date = new Date(time_stamp);
    return `${date.toLocaleTimeString()}  ${date.toLocaleDateString()}`
  }
  if (method === 'POST') {
    requestDetails= {
      body: request.body,
      headers: request.headers
    }
  } else {
    requestDetails = {
      queryParams: request.queryParams,
      headers: request.headers
    }
  }
  return (
    <div className = {`request ${method}`}>
      <div className='method'><strong>{method}</strong></div>
      <div className='timeStamp'>{formatTimeStamp()}</div>
      <div className='path'>{path}</div>
      <RequestDetail request={requestDetails}></RequestDetail>
    </div>
  )
}

export default Request