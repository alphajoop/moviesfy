import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function Header() {
  return (
    <header className="container font-inter py-4 flex justify-between max-sm:gap-y-2 max-sm:flex-col md:mb-10">
      <div className="text-2xl font-semibold">
        <Link to="/">MovieApp</Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="sm:gap-x-10 gap-x-4 max-sm:w-full">
          <NavigationMenuItem>
            <Link to={'/'}>Watch List</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to={'/watched'}>Watched</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Search />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
