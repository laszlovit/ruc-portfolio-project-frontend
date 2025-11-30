interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: { logo: 'h-8 w-8', text: 'text-lg' },
  md: { logo: 'h-12 w-12', text: 'text-2xl' },
  lg: { logo: 'h-16 w-16', text: 'text-3xl' },
}

export function Logo({ size = 'md' }: LogoProps) {
  const styles = sizeStyles[size]

  return (
    <div className="flex items-center space-x-2">
      <img className={styles.logo} src="./movie_surf_logo.png" alt="" />
      <p className={`${styles.text} font-semibold text-primary`}>MovieSurf</p>
    </div>
  )
}
