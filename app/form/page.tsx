import Link from 'next/link';

export default function FormPage() {
  return (
    <main className="main">
      <h1>Edit your profile</h1>
      <p>Profile editing is available from the profile page.</p>
      <Link href="/profile">Open profile</Link>
    </main>
  );
}
