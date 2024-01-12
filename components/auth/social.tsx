"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size="lg"
        className="flex items-center"
        variant="outline"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
        <span className="ml-2">Google</span>
      </Button>
      <Button
        size="lg"
        className="flex items-center"
        variant="outline"
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </Button>
    </div>
  );
};
