import { useState, useEffect } from 'react';
import './App.css';
import AgentCard from './components/AgentCard/AgentCard';
import agentsData from './data/agents';

const statuses = ["On Call", "Available", "Away"];

const randomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

const randomizeCalls = (calls) => Math.random() > 0.7 ? calls + 1 : calls;

const summaryStats = (agents) => [
  { label: "On Call", value: agents.filter(a => a.status === "On Call").length, color: "#22c55e" },
  { label: "Available", value: agents.filter(a => a.status === "Available").length, color: "#3b82f6" },
  { label: "Away", value: agents.filter(a => a.status === "Away").length, color: "#f59e0b" },
  { label: "Total Calls Today", value: agents.reduce((sum, a) => sum + a.calls, 0), color: "#a855f7" },
];

function App() {
  const [agents, setAgents] = useState(agentsData);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        const newStatus = randomStatus();
        return {
          ...agent,
          status: newStatus,
          calls: randomizeCalls(agent.calls),
          callStart: newStatus === "On Call" && agent.status !== "On Call"
            ? Date.now()
            : agent.callStart,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">AMC Dashboard</h1>
          <p className="dashboard-subtitle">Live Agent Monitor — {new Date().toLocaleString()}</p>
        </div>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

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

      <div className="brand">powered by Sephaya.dev</div>
    </div>
  );
}

export default App;