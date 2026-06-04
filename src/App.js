import './App.css';
import AgentCard from './components/AgentCard/AgentCard';
import agents from './data/agents';

const summaryStats = (agents) => [
  { label: "On Call", value: agents.filter(a => a.status === "On Call").length, color: "#22c55e" },
  { label: "Available", value: agents.filter(a => a.status === "Available").length, color: "#3b82f6" },
  { label: "Away", value: agents.filter(a => a.status === "Away").length, color: "#f59e0b" },
  { label: "Total Calls Today", value: agents.reduce((sum, a) => sum + a.calls, 0), color: "#a855f7" },
];

function App() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">AMC Dashboard</h1>
      <p className="dashboard-subtitle">Live Agent Monitor — {new Date().toLocaleDateString()}</p>

      <div className="summary-bar">
        {summaryStats(agents).map(stat => (
          <div key={stat.label} className="summary-card">
            <div className="summary-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="summary-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="agent-grid">
        {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
      </div>
    </div>
  );
}

export default App;