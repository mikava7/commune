import {
  HomeIcon,
  ShoppingBagIcon,
  CogIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

export const navbarLinks = [
  { icon: HomeIcon as any, href: "/posts", label: "Feed" },
  { href: "/create", label: "Post" },
  { icon: ShoppingBagIcon as any, href: "/products", label: "Products" },
  { icon: CogIcon as any, href: "/services", label: "Services" },
  { icon: CalendarIcon as any, href: "/events", label: "Events" },
];

export const formTags = [
  { href: "/create", label: "Post" },
  { href: "/product-form", label: "product" },
  { href: "/service-form", label: "service" },
  { href: "/announcement-form", label: "announcement" },
  { href: "/event-form", label: "event" },
];
