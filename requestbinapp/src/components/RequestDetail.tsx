import { type RequestDetails } from '../types';
import { useState } from 'react';

function RequestDetail(props: RequestDetails) {
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [headersExpanded, setHeadersExpanded] = useState(false);
  const [queryParamsExpanded, setQueryParamsExpanded] = useState(false);
  let newProps = props.props;
  const {headers, body, queryParams} = newProps;
  return (
    <>
      <div className = 'button.headers' onClick = {()=> setHeadersExpanded(!headersExpanded)}>Headers</div>
      {headersExpanded && <div className = 'details.headers'>{JSON.stringify(headers)}</div>}
      <div className = 'button.body' onClick = {() => setBodyExpanded(!bodyExpanded)}>Body</div>
      {bodyExpanded && <div className = 'details.body'>{body}</div>}
      <div className = 'button.queryParams' onClick ={() => setQueryParamsExpanded(!queryParamsExpanded)}>Query</div>
      {queryParamsExpanded && <div className = 'details.query'>{queryParams}</div>}
    </>
  )
}

export default RequestDetail;