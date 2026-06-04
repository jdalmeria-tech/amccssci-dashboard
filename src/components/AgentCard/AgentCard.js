import "./AgentCard.css";

const statusColor = (status) => {
  if (status === "On Call") return "status-oncall";
  if (status === "Available") return "status-available";
  return "status-away";
};

function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <div className="agent-name">{agent.name}</div>
      <div className={`agent-status ${statusColor(agent.status)}`}>
        {agent.status === "On Call" && <span className="blink-dot"></span>}
        {agent.status}
      </div>
      <div className="agent-calls">📞 {agent.calls} calls today</div>
    </div>
  );
}

export default AgentCard;
