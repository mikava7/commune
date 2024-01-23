import {
  HomeIcon,
  ShoppingBagIcon,
  CogIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

const links = [
  { icon: HomeIcon as any, href: "/posts", label: "Feed" },
  { href: "/create", label: "Post" },
  { icon: ShoppingBagIcon as any, href: "/products", label: "Products" },
  { icon: CogIcon as any, href: "/services", label: "Services" },
  { icon: CalendarIcon as any, href: "/events", label: "Events" },
];

export default links;
