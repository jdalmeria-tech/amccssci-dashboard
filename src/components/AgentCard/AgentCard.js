import { useState, useEffect } from 'react';
import './AgentCard.css';

const statusClass = (status) => {
  if (status === "On Call") return "status-oncall";
  if (status === "Available") return "status-available";
  return "status-away";
};

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function AgentCard({ agent }) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (agent.status !== "On Call" || !agent.callStart) {
      setDuration(0);
      return;
    }

    const timer = setInterval(() => {
      setDuration(Date.now() - agent.callStart);
    }, 1000);

    return () => clearInterval(timer);
  }, [agent.status, agent.callStart]);

  return (
    <div className="agent-card">
      <div className="agent-name">{agent.name}</div>
      <div className={`agent-status ${statusClass(agent.status)}`}>
        {agent.status === "On Call" && <span className="blink-dot"></span>}
        {agent.status}
      </div>
      <div className="agent-calls">📞 {agent.calls} calls today</div>
      {agent.status === "On Call" && (
        <div className="agent-duration">⏱ {formatDuration(duration)}</div>
      )}
    </div>
  );
}

export default AgentCard;