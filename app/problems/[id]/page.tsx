import Link from "next/link";
import { DependencyGraph } from "../../../components/dependency-graph";
import { ScenarioSimulator } from "../../../components/scenario-simulator";
import { buildProblemGraph } from "../../../lib/graph-data";
import { getBlockedTasks, getLeverageActions, problems } from "../../../lib/mock-data";

export function generateStaticParams() {
  return problems.map((problem) => ({ id: problem.id }));
}

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const problem = problems.find((entry) => entry.id === params.id);

  if (!problem) {
    return (
      <main className="section">
        <div className="container panel">
          <h1>Problem not found</h1>
          <Link className="text-link" href="/">Return home</Link>
        </div>
      </main>
    );
  }

  const blockedTasks = getBlockedTasks(problem);
  const leverageActions = getLeverageActions(problem);
  const graph = buildProblemGraph(problem);

  return (
    <main className="section">
      <div className="container detail-stack">
        <div className="section-head">
          <div>
            <p className="eyebrow">Problem detail</p>
            <h1>{problem.title}</h1>
          </div>
          <span className={`status ${problem.status}`}>{problem.status}</span>
        </div>

        <div className="panel">
          <p><strong>Location:</strong> {problem.location}</p>
          <p>{problem.summary}</p>
        </div>

        <DependencyGraph
          title="System dependency view"
          subtitle="See how projects, tasks, and resources connect around this problem."
          nodes={graph.nodes}
          edges={graph.edges}
        />

        <ScenarioSimulator problem={problem} />

        <div className="detail-grid">
          <section className="panel">
            <h2>Projects and task chains</h2>
            <div className="chain-list">
              {problem.projects.map((project) => (
                <div key={project.id} className="chain-card">
                  <div className="problem-top">
                    <h3>{project.title}</h3>
                    <span className={`status ${project.status}`}>{project.status}</span>
                  </div>
                  <p><strong>Lead:</strong> {project.lead}</p>
                  <ul className="task-chain">
                    {project.tasks.map((task) => (
                      <li key={task.id}>
                        <span className={`status ${task.status}`}>{task.status}</span>
                        <div>
                          <strong>{task.title}</strong>
                          {task.dependsOn.length > 0 ? (
                            <p>Depends on: {task.dependsOn.join(", ")}</p>
                          ) : (
                            <p>No dependency blockers.</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <aside className="sidebar-stack">
            <section className="panel">
              <h2>Blocked tasks</h2>
              <ul className="activity-list">
                {blockedTasks.length > 0 ? blockedTasks.map((task) => (
                  <li key={task.id}><strong>{task.projectTitle}:</strong> {task.title}</li>
                )) : <li>No blocked tasks right now.</li>}
              </ul>
            </section>

            <section className="panel">
              <h2>Resources</h2>
              <ul className="activity-list">
                {problem.resources.map((resource) => (
                  <li key={resource.id}>
                    <strong>{resource.name}</strong> — {resource.kind}, {resource.status}
                  </li>
                ))}
              </ul>
            </section>

            <section className="panel">
              <h2>Highest-leverage next actions</h2>
              <ul className="activity-list">
                {leverageActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
