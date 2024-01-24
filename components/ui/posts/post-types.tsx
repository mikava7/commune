import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listingTypes } from "@/lib/listing-type";
import Link from "next/link";
export default function Postypes() {
  return (
    <div className="flex gap-4">
      {listingTypes.map((type) => (
        <Link href={type.link}>
          <Card
            key={type.title}
            className="w-54 h-60 bg-slate-100 flex flex-col items-center"
          >
            <span className="my-4">{type.icon}</span>
            <CardHeader className="flex flex-col items-center w-full flex-1">
              <CardTitle className="mt-2 mb-1">{type.title}</CardTitle>
            </CardHeader>
            <CardDescription className="text-center mb-auto flex-1">
              {type.description}
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
}
