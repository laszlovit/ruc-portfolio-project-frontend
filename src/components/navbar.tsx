import { Menu, User, Film, Tv, Users } from 'lucide-react'
import { Container } from './container'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { NavLink } from 'react-router'

// Hardcoded auth state - will be replaced with real auth later
const IS_LOGGED_IN = true
const USER_NAME = 'John Doe'
const USER_AVATAR = 'https://placehold.co/40x40?text=JD'

const navLinks = [
  { href: '#', label: 'Movies', icon: Film },
  { href: '#', label: 'TV Shows', icon: Tv },
  { href: '#', label: 'Celebs', icon: Users },
]

export default function Navbar() {
  return (
    <nav className="border-b">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded bg-primary text-primary-foreground">
              <span className="text-sm font-bold">M</span>
            </div>
            <span className="text-xl font-bold">MovieSurf</span>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      href={link.href}
                      className="flex items-center gap-2"
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <NavLink
                      key={link.label}
                      to={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <Icon className="size-5" />
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
              <div className="mt-auto pt-8 border-t">
                {IS_LOGGED_IN ? (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Avatar>
                      <AvatarImage src={USER_AVATAR} alt={USER_NAME} />
                      <AvatarFallback>
                        {USER_NAME.split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{USER_NAME}</span>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" size="sm">
                    <User className="size-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-4">
            {IS_LOGGED_IN ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={USER_AVATAR} alt={USER_NAME} />
                  <AvatarFallback>
                    {USER_NAME.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{USER_NAME}</span>
              </div>
            ) : (
              <Button variant="outline" size="sm">
                <User className="size-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}

