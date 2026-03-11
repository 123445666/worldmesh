import Link from "next/link";

const docs = [
  { href: "/", title: "Overview", description: "Landing page and MVP concept." },
  { href: "https://github.com/123445666/worldmesh", title: "GitHub repo", description: "Source code and project history." },
];

const localDocs = [
  "vision.md",
  "roadmap.md",
  "architecture.md",
  "domain-model.md",
];

export default function DocsPage() {
  return (
    <main className="section">
      <div className="container docs-page">
        <p className="eyebrow">Docs</p>
        <h1>Project documents</h1>
        <p className="lede">
          WorldMesh starts as a documentation-first project: clear goals, visible
          constraints, and an MVP focused on coordination rather than control.
        </p>

        <div className="grid docs-grid">
          {docs.map((doc) => (
            <article key={doc.title} className="panel">
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
              {doc.href.startsWith("http") ? (
                <a className="text-link" href={doc.href} target="_blank" rel="noreferrer">
                  Open link
                </a>
              ) : (
                <Link className="text-link" href={doc.href}>
                  Open page
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="panel local-docs">
          <h2>Local docs in the repo</h2>
          <ul>
            {localDocs.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
