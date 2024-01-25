import {
  ShoppingCartIcon,
  HomeIcon,
  AcademicCapIcon,
  TruckIcon,
  UsersIcon,
  FilmIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

export const listingTypes = [
  {
    title: "Item for Sale",
    description: "Create a single listing for one or more items to sell",
    icon: <ShoppingCartIcon className="h-6 w-6" />,
    link: "/create/item",
  },
  {
    title: "Vehicle for Sale",
    description: "Sell a car, truck, or other type of vehicle",
    icon: <TruckIcon className="h-6 w-6" />,
    link: "/create/vehicle",
  },
  {
    title: "Home for Sale or Rent",
    description: "List a house or apartment for sale or rent",
    icon: <HomeIcon className="h-6 w-6" />,
    link: "/create/home",
  },
  {
    title: "Host a Seminar, Workshop, or Class",
    description: "Offer a seminar, workshop, or class",
    icon: <AcademicCapIcon className="h-6 w-6" />,
    link: "/create/workshop",
  },
  {
    title: "Host a Social Gathering",
    description: "Plan and announce a social event for the community",
    icon: <UsersIcon className="h-6 w-6" />,
    link: "/create/event",
  },
];

export const categories = [
  {
    category: "Home & Garden",
    icon: <HomeIcon className="h-4 w-4" />,
    subCategories: [
      "Furniture",
      "Gardening",
      "Decor" /* Add more subcategories */,
    ],
  },
  {
    category: "Entertainment",
    icon: <FilmIcon className="h-4 w-4 border border-red-950" />,
    subCategories: ["Movies", "Music", "Games" /* Add more subcategories */],
  },
  {
    category: "Clothing & Accessories",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    subCategories: ["Clothing", "Shoes", "Accessories"],
  },
  {
    category: "Electronics",
    icon: <PhoneIcon className="h-4 w-4" />,
    subCategories: ["Smartphones", "Laptops", "Gadgets"],
  },
  // Add more categories as needed
];

export const conditions = ["new", "Used - Like New", "Used - Good", "Used - Fair"];
