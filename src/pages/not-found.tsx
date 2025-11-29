import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <Button asChild>
        <Link to={'/'}>Back to homepage</Link>
      </Button>
    </>
  )
}
