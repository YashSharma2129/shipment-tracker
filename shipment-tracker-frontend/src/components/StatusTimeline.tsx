import React from 'react';
import { StatusUpdate } from '../types';
import StatusUpdateItem from './StatusUpdateItem';

interface StatusTimelineProps {
  updates: StatusUpdate[];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ updates }) => {
  // Sort updates by timestamp in descending order (newest first)
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="status-timeline">
      <h3>Status History</h3>
      <div className="timeline">
        {sortedUpdates.map((update, index) => (
          <StatusUpdateItem key={index} update={update} />
        ))}
      </div>
    </div>
  );
};

export default StatusTimeline;
