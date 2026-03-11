import type { Problem } from "./mock-data";

export function buildProblemGraph(problem: Problem) {
  const nodes: {
    id: string;
    label: string;
    kind: "problem" | "project" | "task" | "resource";
    tone?: "normal" | "blocked" | "active" | "missing";
  }[] = [
    {
      id: problem.id,
      label: problem.title,
      kind: "problem",
      tone: problem.status === "active" ? "active" : "normal",
    },
  ];

  const edges: { from: string; to: string; label?: string }[] = [];

  for (const project of problem.projects) {
    nodes.push({
      id: project.id,
      label: project.title,
      kind: "project",
      tone: project.status === "blocked" ? "blocked" : project.status === "active" ? "active" : "normal",
    });

    edges.push({ from: problem.id, to: project.id, label: "contains" });

    for (const task of project.tasks) {
      nodes.push({
        id: task.id,
        label: task.title,
        kind: "task",
        tone: task.status === "blocked" ? "blocked" : task.status === "active" ? "active" : "normal",
      });

      edges.push({ from: project.id, to: task.id, label: "work item" });

      for (const depId of task.dependsOn) {
        const depTask = project.tasks.find((entry) => entry.id === depId);
        if (depTask) {
          edges.push({ from: depTask.id, to: task.id, label: "unlocks" });
        }
      }

      for (const resourceId of task.resourceIds) {
        const resource = problem.resources.find((entry) => entry.id === resourceId);
        if (resource) {
          if (!nodes.find((entry) => entry.id === resource.id)) {
            nodes.push({
              id: resource.id,
              label: resource.name,
              kind: "resource",
              tone: resource.status === "missing" ? "missing" : resource.status === "limited" ? "blocked" : "normal",
            });
          }

          edges.push({
            from: resource.id,
            to: task.id,
            label: resource.status === "missing" ? "missing input" : "supports",
          });
        }
      }
    }
  }

  return { nodes, edges };
}
