import {
  Home,
  User,
  Briefcase,
  BookOpen,
  PlaySquare,
  Mail,
  Terminal
} from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', icon: Home, isPrimary: true },
  { href: '#about', icon: User },
  { href: '#projects', icon: Briefcase },
  { href: '#publications', icon: BookOpen },
  { href: '#media', icon: PlaySquare },
  { href: '#contact', icon: Mail },
];

const NavLink = ({ href, icon: Icon, isPrimary = false }: { href: string; icon: React.ElementType, isPrimary?: boolean }) => {
  return (
    <Link href={href} className="group relative flex items-center justify-center h-12 w-full text-white/70 hover:text-primary transition-colors">
      <Icon className={`h-6 w-6 ${isPrimary ? 'text-primary' : ''}`} />
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {href.substring(1).charAt(0).toUpperCase() + href.substring(2)}
      </div>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-16 bg-black flex flex-col items-center justify-between py-4 z-50 border-r border-white/10">
      <div className="flex flex-col items-center gap-2 w-full">
        <Link href="#hero" className="flex items-center justify-center h-12 w-full text-white mb-4">
          <Terminal className="h-7 w-7" />
        </Link>
        {navLinks.map(link => (
          <NavLink key={link.href} href={link.href} icon={link.icon} isPrimary={link.isPrimary} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
         <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white font-bold text-sm">
            N
         </button>
      </div>
    </aside>
  );
}
