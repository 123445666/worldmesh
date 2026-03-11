import Link from "next/link";
import type { Problem } from "../lib/mock-data";

export function ProblemOverview({ problem }: { problem: Problem }) {
  const projectCount = problem.projects.length;
  const taskCount = problem.projects.reduce((sum, project) => sum + project.tasks.length, 0);
  const blockedCount = problem.projects.reduce(
    (sum, project) => sum + project.tasks.filter((task) => task.status === "blocked").length,
    0,
  );

  return (
    <article className="panel problem-overview">
      <div className="problem-top">
        <span className={`status ${problem.status}`}>{problem.status}</span>
        <span>{problem.location}</span>
      </div>
      <h3>{problem.title}</h3>
      <p>{problem.summary}</p>
      <div className="stats-row">
        <div><strong>{projectCount}</strong><span>projects</span></div>
        <div><strong>{taskCount}</strong><span>tasks</span></div>
        <div><strong>{blockedCount}</strong><span>blocked</span></div>
      </div>
      <Link className="text-link" href={`/problems/${problem.id}`}>
        Open problem view
      </Link>
    </article>
  );
}
