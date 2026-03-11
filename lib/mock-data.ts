export type Status = "active" | "monitoring" | "blocked" | "planned" | "done";

export type Resource = {
  id: string;
  name: string;
  kind: "funding" | "vehicle" | "people" | "equipment" | "space";
  status: "available" | "limited" | "missing";
};

export type Task = {
  id: string;
  title: string;
  status: Status;
  dependsOn: string[];
  resourceIds: string[];
};

export type Project = {
  id: string;
  title: string;
  status: Status;
  lead: string;
  tasks: Task[];
};

export type Problem = {
  id: string;
  title: string;
  location: string;
  status: Status;
  summary: string;
  projects: Project[];
  resources: Resource[];
};

export const problems: Problem[] = [
  {
    id: "flooding-northside",
    title: "Recurring flooding in Northside",
    location: "Northside district",
    status: "active",
    summary: "Streets flood repeatedly after heavy rain because drains are blocked, reporting is fragmented, and repair scheduling is unclear.",
    resources: [
      { id: "r1", name: "Survey volunteers", kind: "people", status: "limited" },
      { id: "r2", name: "Drain cameras", kind: "equipment", status: "missing" },
      { id: "r3", name: "Repair budget", kind: "funding", status: "limited" },
    ],
    projects: [
      {
        id: "street-survey",
        title: "Map flood-prone streets",
        status: "active",
        lead: "Civic response team",
        tasks: [
          { id: "t1", title: "Survey 12 affected streets", status: "active", dependsOn: [], resourceIds: ["r1"] },
          { id: "t2", title: "Upload drain condition reports", status: "planned", dependsOn: ["t1"], resourceIds: [] },
        ],
      },
      {
        id: "drain-inspection",
        title: "Inspect blocked drains",
        status: "blocked",
        lead: "Utilities partner",
        tasks: [
          { id: "t3", title: "Confirm camera availability", status: "blocked", dependsOn: [], resourceIds: ["r2"] },
          { id: "t4", title: "Prioritize repair queue", status: "planned", dependsOn: ["t2", "t3"], resourceIds: ["r3"] },
        ],
      },
    ],
  },
  {
    id: "food-delivery",
    title: "Food delivery coordination gaps",
    location: "East corridor",
    status: "active",
    summary: "Deliveries are delayed because volunteer rosters, vehicle availability, and neighbourhood demand are tracked in different places.",
    resources: [
      { id: "r5", name: "Weekend drivers", kind: "people", status: "limited" },
      { id: "r6", name: "2 vans", kind: "vehicle", status: "available" },
      { id: "r7", name: "Dispatch room", kind: "space", status: "missing" },
    ],
    projects: [
      {
        id: "dispatch-pilot",
        title: "Community dispatch pilot",
        status: "active",
        lead: "Mutual aid network",
        tasks: [
          { id: "t5", title: "Create route board", status: "done", dependsOn: [], resourceIds: [] },
          { id: "t6", title: "Schedule weekend coverage", status: "active", dependsOn: ["t5"], resourceIds: ["r5", "r6"] },
          { id: "t7", title: "Secure shared dispatch room", status: "blocked", dependsOn: [], resourceIds: ["r7"] },
        ],
      },
    ],
  },
];

export function getBlockedTasks(problem: Problem) {
  return problem.projects.flatMap((project) =>
    project.tasks.filter((task) => task.status === "blocked").map((task) => ({
      ...task,
      projectTitle: project.title,
    })),
  );
}

export function getLeverageActions(problem: Problem) {
  const missingResources = problem.resources.filter((resource) => resource.status === "missing");
  const limitedResources = problem.resources.filter((resource) => resource.status === "limited");

  return [
    ...missingResources.map((resource) => `Unblock ${resource.name} to free blocked work.`),
    ...limitedResources.map((resource) => `Increase ${resource.name} capacity to reduce bottlenecks.`),
  ].slice(0, 3);
}
