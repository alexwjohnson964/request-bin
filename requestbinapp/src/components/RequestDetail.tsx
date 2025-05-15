import { type RequestDetails } from '../types';
import { useState } from 'react';
import '../App.css';
function RequestDetail(props: RequestDetails) {
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [headersExpanded, setHeadersExpanded] = useState(false);
  const [queryParamsExpanded, setQueryParamsExpanded] = useState(false);
  let newProps = props.props;
  const { headers, body, queryParams} = newProps;
  
  return (
    <>
      <button className = 'button headers' onClick = {()=> setHeadersExpanded(!headersExpanded)}>Headers</button>
      {headersExpanded && <div className = 'details headers'>{JSON.stringify(headers)}</div>}
      <br></br>
      {body && <button className = 'button body' onClick = {() => setBodyExpanded(!bodyExpanded)}>Body</button>}
      {bodyExpanded && <><div className = 'details body'>{body}</div> <br></br></>}
     
      {queryParams && <button className = 'button queryParams' onClick ={() => setQueryParamsExpanded(!queryParamsExpanded)}>Query Params</button>}
      {queryParamsExpanded && <div className = 'details query'>{queryParams}</div>}
      <br></br>
    </>
  )
}

export default RequestDetail;