import { type RequestDetailProps } from '../types';
import { useState } from 'react';
import '../App.css';

function RequestDetail(props: RequestDetailProps) {
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [headersExpanded, setHeadersExpanded] = useState(false);
  const [queryParamsExpanded, setQueryParamsExpanded] = useState(false);

  const {request} = props

  let headers; let body; let queryParams;
  if ('headers' in request) {
    headers = request.headers;
  }

  if ('body' in request) {
    body = request.body;
  }

  if ('queryParams' in request) {
    queryParams = request.queryParams;
  }
  return (
    <>
      <button className = 'button headers' onClick = {()=> setHeadersExpanded(!headersExpanded)}>Headers</button>
      {headersExpanded && <div className = 'details headers'>{JSON.stringify(headers)}</div>}
      <br></br>
      {body && <button className = 'button body' onClick = {() => setBodyExpanded(!bodyExpanded)}>Body</button>}
      {bodyExpanded && <><div className = 'details body'>{JSON.stringify(body)}</div> <br></br></>}
     
      {queryParams && <button className = 'button queryParams' onClick ={() => setQueryParamsExpanded(!queryParamsExpanded)}>Query Params</button>}
      {queryParamsExpanded && <div className = 'details query'>{JSON.stringify(queryParams)}</div>}
      <br></br>
    </>
  )
}

export default RequestDetail;