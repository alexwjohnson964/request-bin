import RequestDetail from "./RequestDetail";
//import { type RequestDetails } from "../types";
import { type RequestProps } from "../types";
//import { type RequestType } from "../types";
function Request(props: RequestProps) {
  const {method, path, time_stamp} = props.props;
  let requestDetails;
  function formatTimeStamp(timeStamp){
    const date = new Date(time_stamp);
    return `${date.toLocaleTimeString()}  ${date.toLocaleDateString()}`
  }
  if (method === 'POST') {
    requestDetails= {
      body: props.props.body,
      headers: props.props.headers
    }
  } else {
    requestDetails = {
      queryParams: props.props.queryParams,
      headers: props.props.headers
    }
  }
  return (
    <div className = {`request ${method}`}>
      <div className='method'><strong>{method}</strong></div>
      <div className='timeStamp'>{formatTimeStamp(time_stamp)}</div>
      <div className='path'>{path}</div>
      <RequestDetail props={requestDetails}></RequestDetail>
    </div>
  )
}

export default Request