interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: { logo: { height: '2rem', width: '2rem' }, text: 'fs-5' },
  md: { logo: { height: '3rem', width: '3rem' }, text: 'fs-2' },
  lg: { logo: { height: '4rem', width: '4rem' }, text: 'fs-1' },
}

export function Logo({ size = 'md' }: LogoProps) {
  const styles = sizeStyles[size]

  return (
    <div className="d-flex align-items-center gap-2">
      <img style={styles.logo} src="/movie_surf_logo.png" alt="MovieSurf Logo" />
      <p className={`${styles.text} fw-semibold text-primary mb-0`}>MovieSurf</p>
    </div>
  )
}
