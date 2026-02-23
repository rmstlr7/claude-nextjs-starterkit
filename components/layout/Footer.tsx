export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© {currentYear} Dashboard. 모든 권리 보유.</p>
      </div>
    </footer>
  );
}
