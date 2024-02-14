'use client'
import { sidebarLinks } from "@/lib/menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkIcon, TruckIcon, CogIcon, HomeIcon, CalendarIcon, LightBulbIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

export default function ProductSidebar(){
const pathname = usePathname()

const getIcon = (label:string) => {
  switch(label) {
    case 'Products':
      return <LinkIcon className="w-4 h-4" />;
    case 'Vehicles':
      return <TruckIcon className="w-4 h-4" />;
    case 'Services':
      return <CogIcon className="w-4 h-4" />;
    case 'Homes':
      return <HomeIcon className="w-4 h-4" />;
    case 'Events':
      return <CalendarIcon className="w-4 h-4" />;
    case 'Workshops':
      return <LightBulbIcon className="w-4 h-4" />;
    case 'Classes':
      return <AcademicCapIcon className="w-4 h-4" />;
    default:
      return null;
  }
};
        return(
                
                <nav className="flex w-[400px] py-4 border-b border-orange-700 lg:px-8">
                
                <ul className={`flex flex-col space-x-2 `}>
                  {sidebarLinks.map((link) => (
                    <li key={link.href} className="cursor-pointer my-2">
                      <Link href={link.href} className='flex gap-2'>

                      <div className="bg-gray-300 rounded-md p-2">
                  {getIcon(link.label)}
                </div>
                       <button
                        className={`${
                          pathname === link.href
                          ? "text-black font-bold"
                          : "text-gray-900"
                        } hover:text-gray-700 transition duration-300 focus:outline-none`}
                        >
                  {link.label}
                 </button>
                 </Link>


            </li>
          ))}
        </ul>
          
             
              </nav>
            );
                        }