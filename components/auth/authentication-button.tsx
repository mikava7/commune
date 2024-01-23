import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";

async function AuthenticationButton() {
  const session = await auth();

  return (
    <>
      {session ? (
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <button className="bg-blue-600  text-white flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-800 ">
            <PowerIcon className="w-6" />
            <div>Sign Out</div>
          </button>
        </form>
      ) : (
        <Link
          href="/auth/login"
          className=" bg-white text-blue-600 flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-600 hover:text-white"
        >
          Login
        </Link>
      )}
    </>
  );
}

export default AuthenticationButton;
