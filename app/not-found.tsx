import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty">
      <h3>Page not found</h3>
      <p>That route is not part of Helix. Head back to the pool book.</p>
      <Link href="/pools" className="btn">
        Open pools
      </Link>
    </div>
  );
}
