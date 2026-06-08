export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background dark:from-primary-950/20 dark:to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a
            href="/"
            className="text-2xl font-bold text-primary inline-flex items-center gap-2"
          >
            <span className="text-3xl">🎉</span>
            Alquifiestas
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
