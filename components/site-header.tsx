import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          WorldMesh
        </Link>
        <nav>
          <ul className="nav-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/docs">Docs</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
