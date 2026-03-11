const problems = [
  {
    title: "Recurring flooding in Northside",
    status: "active",
    projects: 3,
    blockers: 2,
  },
  {
    title: "Volunteer driver shortage",
    status: "monitoring",
    projects: 2,
    blockers: 1,
  },
  {
    title: "Food delivery coordination gaps",
    status: "active",
    projects: 4,
    blockers: 3,
  },
];

const activity = [
  "Decision logged: prioritize drainage survey for 12 streets.",
  "Resource added: 2 vans available for weekend food deliveries.",
  "Task blocked: permit approval pending from local authority.",
  "Project created: community call center pilot.",
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">WorldMesh</p>
            <h1>Coordinate real-world problems like open-source projects.</h1>
            <p className="lede">
              WorldMesh helps communities, nonprofits, and civic teams map problems,
              organize projects, track blockers, and show progress transparently.
            </p>
            <div className="actions">
              <a className="button primary" href="#dashboard">See the MVP view</a>
              <a className="button secondary" href="/docs">Read the project docs</a>
            </div>
          </div>
          <div className="hero-card panel">
            <h2>Core flow</h2>
            <ol>
              <li>Define the problem</li>
              <li>Break it into projects</li>
              <li>Assign tasks and resources</li>
              <li>Track blockers and decisions</li>
              <li>Publish evidence and progress</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="dashboard">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Prototype dashboard</p>
              <h2>Example problem overview</h2>
            </div>
            <span className="badge">MVP concept</span>
          </div>

          <div className="grid problems-grid">
            {problems.map((problem) => (
              <article className="panel problem-card" key={problem.title}>
                <div className="problem-top">
                  <span className={`status ${problem.status}`}>{problem.status}</span>
                  <span>{problem.projects} projects</span>
                </div>
                <h3>{problem.title}</h3>
                <p>{problem.blockers} active blockers need attention.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2>Make dependencies and bottlenecks visible.</h2>
            <p>
              Most coordination failures are not failures of caring. They are failures
              of visibility. WorldMesh is meant to show what exists, what is blocked,
              what depends on what, and what changed.
            </p>
          </div>
          <div className="panel">
            <h3>Recent activity</h3>
            <ul className="activity-list">
              {activity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
