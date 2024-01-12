"use client";
import { useRouter } from "next/navigation";
interface LoginButtonPrsops {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonPrsops) => {
  const router = useRouter();
  const onClick = () => {
    console.log("Login");

    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <div>
      {" "}
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
    </div>
  );
};
