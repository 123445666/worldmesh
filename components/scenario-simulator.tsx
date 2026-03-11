"use client";

import { useMemo, useState } from "react";
import type { Problem } from "../lib/mock-data";

type SimulationResult = {
  unlockedTasks: string[];
  remainingBlocked: string[];
  notes: string[];
};

function simulate(problem: Problem, selectedResourceIds: string[]): SimulationResult {
  const selected = new Set(selectedResourceIds);
  const unlockedTasks: string[] = [];
  const remainingBlocked: string[] = [];
  const notes: string[] = [];

  for (const project of problem.projects) {
    for (const task of project.tasks) {
      const missingResources = task.resourceIds
        .map((resourceId) => problem.resources.find((resource) => resource.id === resourceId))
        .filter(Boolean)
        .filter((resource) => resource!.status === "missing" || resource!.status === "limited");

      const covered = missingResources.every((resource) => selected.has(resource!.id));

      if (task.status === "blocked" && covered) {
        unlockedTasks.push(`${project.title}: ${task.title}`);
      } else if (task.status === "blocked") {
        remainingBlocked.push(`${project.title}: ${task.title}`);
      }
    }
  }

  if (selected.has("r2")) notes.push("Drain cameras added: inspection work can start.");
  if (selected.has("r3")) notes.push("Repair budget improved: prioritization becomes actionable.");
  if (selected.has("r5")) notes.push("Weekend driver capacity increased: delivery coverage improves.");
  if (selected.has("r7")) notes.push("Dispatch room secured: central coordination becomes easier.");

  if (unlockedTasks.length === 0) {
    notes.push("No blocked tasks fully unlocked yet — more resources or dependency completion may be needed.");
  }

  return { unlockedTasks, remainingBlocked, notes };
}

export function ScenarioSimulator({ problem }: { problem: Problem }) {
  const candidateResources = problem.resources.filter(
    (resource) => resource.status === "missing" || resource.status === "limited",
  );

  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);

  const result = useMemo(
    () => simulate(problem, selectedResourceIds),
    [problem, selectedResourceIds],
  );

  function toggleResource(resourceId: string) {
    setSelectedResourceIds((current) =>
      current.includes(resourceId)
        ? current.filter((id) => id !== resourceId)
        : [...current, resourceId],
    );
  }

  return (
    <section className="panel simulator-panel">
      <div>
        <p className="eyebrow">Scenario simulator</p>
        <h2>If we improve one thing, what changes?</h2>
        <p>
          Test possible interventions by adding capacity to missing or limited resources.
        </p>
      </div>

      <div className="simulator-grid">
        <div className="panel-subtle">
          <h3>Choose interventions</h3>
          <div className="resource-toggle-list">
            {candidateResources.map((resource) => {
              const checked = selectedResourceIds.includes(resource.id);
              return (
                <label key={resource.id} className={`resource-toggle ${checked ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleResource(resource.id)}
                  />
                  <span>
                    <strong>{resource.name}</strong>
                    <em>
                      {resource.kind} · {resource.status}
                    </em>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="panel-subtle">
          <h3>Simulated effect</h3>

          <div className="sim-result-block">
            <h4>Unlocked blocked tasks</h4>
            <ul className="activity-list">
              {result.unlockedTasks.length > 0 ? (
                result.unlockedTasks.map((item) => <li key={item}>{item}</li>)
              ) : (
                <li>No blocked tasks unlocked yet.</li>
              )}
            </ul>
          </div>

          <div className="sim-result-block">
            <h4>Still blocked</h4>
            <ul className="activity-list">
              {result.remainingBlocked.length > 0 ? (
                result.remainingBlocked.map((item) => <li key={item}>{item}</li>)
              ) : (
                <li>No blocked tasks remain.</li>
              )}
            </ul>
          </div>

          <div className="sim-result-block">
            <h4>Coordinator notes</h4>
            <ul className="activity-list">
              {result.notes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
