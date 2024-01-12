// pages/index.js
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold drop-shadow-md">auth</h1>
        <p className="text-lg">authentication</p>
        <LoginButton>
          <Button variant="secondary" size="lg">
            login
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
