import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-site text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg">
          The page you are looking for doesn&apos;t exist — but the conference definitely does.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to the homepage
          </Link>
          <Link href="/programme/" className="btn-outline">
            View the programme
          </Link>
        </div>
      </div>
    </section>
  );
}
