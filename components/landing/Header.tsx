import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-lightBorder bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-xl font-black text-brand-orange">AttendPAC</span>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-darkGray">
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#resources">Resources</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-bold text-brand-darkGray hover-dark"
          >
            Sign in
          </Link>
          <Link href="/login" className="btn-primary hover-bright text-sm">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
