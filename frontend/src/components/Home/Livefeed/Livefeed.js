import {React} from 'react';

const LiveFeed = (props) => {
  return (
    <div>
        <h4>CCTV Live Feed</h4>
      <iframe
        src={props.cctvLiveFeedUrl}
        width="100%"
        height="600"
        title="CCTV Live Feed"
      ></iframe>
    </div>
  );
};

export default LiveFeed;
