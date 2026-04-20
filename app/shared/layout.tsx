// Bare layout for /shared/* — no sidebar, no navigation.
// The root layout already wraps with ThemeProvider, so just pass children through.
export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
