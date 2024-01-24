// pages/index.js
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import FormLinks from "@/components/ui/posts/form-links";
export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold drop-shadow-md">auth</h1>
        <p className="text-lg">authentication</p>
        <FormLinks />
        <LoginButton>
          <Button variant="secondary" size="lg">
            login
          </Button>
        </LoginButton>
        <div>
          <Link href="create">
            <Button variant="secondary" size="lg">
              Create post
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
