import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Homepage sections will be assembled here by Agent 1 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <p className="text-axos-accent font-medium mb-4 tracking-wide uppercase text-sm">
            The Red Hat of Business AI
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
            Hire an AI Employee
            <br />
            <span className="text-axos-text-secondary">That Never Sleeps</span>
          </h1>
          <p className="text-lg md:text-xl text-axos-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Axos Labs installs persistent AI Brains into your business — on your
            hardware, integrated with your systems, operating under your
            oversight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-axos-accent text-white font-medium hover:bg-axos-accent-hover transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-axos-accent-glow"
            >
              Request a Brain
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-axos-border-standard text-axos-text-primary font-medium hover:bg-axos-bg-surface transition-all hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder for additional sections */}
      <section className="py-32 px-4 text-center">
        <p className="text-axos-text-muted text-lg">
          Full website build in progress by the Axos swarm...
        </p>
      </section>
    </div>
  );
}
