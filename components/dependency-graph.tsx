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
  return (
    <section className="panel graph-panel">
      <div className="graph-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="graph-layout">
        <div className="graph-nodes">
          {nodes.map((node) => (
            <div key={node.id} className={`graph-node ${node.kind} ${node.tone ?? "normal"}`}>
              <span className="node-kind">{node.kind}</span>
              <strong>{node.label}</strong>
            </div>
          ))}
        </div>

        <div className="graph-edges">
          <h3>Dependency links</h3>
          <ul className="activity-list">
            {edges.map((edge, index) => (
              <li key={`${edge.from}-${edge.to}-${index}`}>
                <strong>{edge.from}</strong> → <strong>{edge.to}</strong>
                {edge.label ? ` (${edge.label})` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
