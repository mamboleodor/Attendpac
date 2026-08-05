import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-brand-charcoal text-white flex-col justify-center px-16">
        <span className="text-2xl font-black text-brand-orange mb-4">
          AttendPAC
        </span>
        <p className="text-neutral-secondaryText max-w-sm">
          Attendance and workforce management for growing teams.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <LoginForm />
      </div>
    </main>
  );
}
