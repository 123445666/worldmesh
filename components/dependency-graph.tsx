"use client";

import { useMemo, useState } from "react";

type GraphNode = {
  id: string;
  label: string;
  kind: "problem" | "project" | "task" | "resource";
  tone?: "normal" | "blocked" | "active" | "missing";
};

type GraphEdge = {
  from: string;
  to: string;
  label?: string;
};

export function DependencyGraph({
  title,
  subtitle,
  nodes,
  edges,
}: {
  title: string;
  subtitle?: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id ?? null);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const incoming = useMemo(
    () => edges.filter((edge) => edge.to === selectedNodeId),
    [edges, selectedNodeId],
  );

  const outgoing = useMemo(
    () => edges.filter((edge) => edge.from === selectedNodeId),
    [edges, selectedNodeId],
  );

  const highlightedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    if (selectedNodeId) ids.add(selectedNodeId);
    incoming.forEach((edge) => ids.add(edge.from));
    outgoing.forEach((edge) => ids.add(edge.to));
    return ids;
  }, [incoming, outgoing, selectedNodeId]);

  return (
    <section className="panel graph-panel">
      <div className="graph-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="graph-layout inspector-layout">
        <div className="graph-nodes">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isLinked = highlightedNodeIds.has(node.id);
            return (
              <button
                type="button"
                key={node.id}
                className={`graph-node ${node.kind} ${node.tone ?? "normal"} ${
                  isSelected ? "selected" : isLinked ? "linked" : "dimmed"
                }`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <span className="node-kind">{node.kind}</span>
                <strong>{node.label}</strong>
              </button>
            );
          })}
        </div>

        <div className="graph-inspector panel-subtle">
          <h3>Inspector</h3>
          {selectedNode ? (
            <>
              <p>
                <strong>{selectedNode.label}</strong>
              </p>
              <p>
                Type: <span className={`status ${selectedNode.tone ?? "active"}`}>{selectedNode.kind}</span>
              </p>

              <div className="inspector-columns">
                <div>
                  <h4>What this depends on</h4>
                  <ul className="activity-list">
                    {incoming.length > 0 ? (
                      incoming.map((edge, index) => (
                        <li key={`in-${edge.from}-${index}`}>
                          <strong>{edge.from}</strong>
                          {edge.label ? ` — ${edge.label}` : ""}
                        </li>
                      ))
                    ) : (
                      <li>No incoming dependencies.</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4>What this unlocks</h4>
                  <ul className="activity-list">
                    {outgoing.length > 0 ? (
                      outgoing.map((edge, index) => (
                        <li key={`out-${edge.to}-${index}`}>
                          <strong>{edge.to}</strong>
                          {edge.label ? ` — ${edge.label}` : ""}
                        </li>
                      ))
                    ) : (
                      <li>No downstream links.</li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p>Select a node to inspect the system around it.</p>
          )}
        </div>
      </div>
    </section>
  );
}
