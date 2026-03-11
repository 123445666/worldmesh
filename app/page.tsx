import { DependencyGraph } from "../components/dependency-graph";
import { ProblemOverview } from "../components/problem-overview";
import { buildProblemGraph } from "../lib/graph-data";
import { getLeverageActions, problems } from "../lib/mock-data";

const activity = [
  "Decision logged: prioritize drainage survey for 12 streets.",
  "Resource added: 2 vans available for weekend food deliveries.",
  "Task blocked: permit approval pending from local authority.",
  "Project created: community call center pilot.",
];

export default function HomePage() {
  const leverageBoard = problems.flatMap((problem) =>
    getLeverageActions(problem).map((action) => ({
      problem: problem.title,
      action,
    })),
  );

  const featuredGraph = buildProblemGraph(problems[0]);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">WorldMesh</p>
            <h1>Coordinate real-world problems like open-source projects.</h1>
            <p className="lede">
              WorldMesh helps communities, nonprofits, and civic teams map problems,
              organize projects, track blockers, and see which interventions unlock the
              most progress.
            </p>
            <div className="actions">
              <a className="button primary" href="#dashboard">See the coordination board</a>
              <a className="button secondary" href="/docs">Read the project docs</a>
            </div>
          </div>
          <div className="hero-card panel">
            <h2>Killer feature</h2>
            <p className="lede">
              A coordination graph that shows hidden dependencies, blocked tasks, and
              the highest-leverage next action.
            </p>
            <ol>
              <li>Find the blockage</li>
              <li>Trace what depends on it</li>
              <li>Unlock the smallest bottleneck</li>
              <li>Show progress publicly</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="dashboard">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Coordination board</p>
              <h2>Problem overview</h2>
            </div>
            <span className="badge">Prototype MVP</span>
          </div>

          <div className="grid problems-grid">
            {problems.map((problem) => (
              <ProblemOverview key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <DependencyGraph
            title="Dependency graph"
            subtitle="A sample systems view for the Northside flooding problem."
            nodes={featuredGraph.nodes}
            edges={featuredGraph.edges}
          />
        </div>
      </section>

      <section className="section muted">
        <div className="container two-col">
          <div className="panel">
            <p className="eyebrow">Highest-leverage actions</p>
            <h2>What should a coordinator do next?</h2>
            <ul className="activity-list leverage-list">
              {leverageBoard.map((item) => (
                <li key={`${item.problem}-${item.action}`}>
                  <strong>{item.problem}:</strong> {item.action}
                </li>
              ))}
            </ul>
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
