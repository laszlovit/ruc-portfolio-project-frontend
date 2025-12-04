export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  const containerClass = className ? `container ${className}` : 'container'
  return (
    <div className={containerClass}>
      {children}
    </div>
  )
}
