import React from "react";
import supabase from "@/supabase/supabase";
import github from "../assets/images/github.png";
import google from "../assets/images/google.png";
import favIcon from "../assets/images/favicon.png";
import palestineCountryFilledIcon from "../assets/images/palestineCountryFilled.png";

const AuthenticationPage: React.FC = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem(
        "oauth_provider_token",
        session.provider_token,
      );
    }

    if (session && session.provider_refresh_token) {
      window.localStorage.setItem(
        "oauth_provider_refresh_token",
        session.provider_refresh_token,
      );
    }

    if (event === "SIGNED_OUT") {
      window.localStorage.removeItem("oauth_provider_token");
      window.localStorage.removeItem("oauth_provider_refresh_token");
    }
  });

  async function handleSignInWithGoogle() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });

    console.log(data);
  }
  async function handleSignInWithGithub() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });

    console.log(data);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-around bg-black p-12 text-white">
      <div className="gap-1rounded-3xl absolute top-6 flex max-w-xl flex-col self-start">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <img src={favIcon} alt="favIcon" className="h-6 w-6" />
          <h1 className="text-xl font-medium">Soft Steps</h1>
        </h1>
        {/* <p className="text-justify text-xs font-thin text-foreground">
          He has already revealed to you in the Book that when you hear Allah's
          revelations being denied or ridiculed, then do not sit in that company
          unless they engage in a different topic, or else you will be like
          them. Surely Allah will gather the hypocrites and disbelievers all
          together in Hell. [4:140]
        </p> */}
      </div>

      <img
        src={palestineCountryFilledIcon}
        alt="palestineCountryFilledIcon"
        className="absolute h-fit w-fit justify-self-center object-cover opacity-5 brightness-75"
      />
      <div className="z-10 flex w-full max-w-xl flex-col justify-center rounded-3xl border border-b-green-900 border-l-red-900 border-r-neutral-500 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Get started</h1>
          <p className="text-xs font-thin">
            Sign In/Up to raise your first step to your goals
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl py-5 md:flex-row">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-900 p-3 backdrop-blur-md transition-colors hover:bg-neutral-900/60"
            onClick={handleSignInWithGoogle}
          >
            <img src={google} className="h-[17px] w-[17px]" />
            <p>Continue With Google</p>
          </button>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-900 p-3 backdrop-blur-md transition-colors hover:bg-neutral-900/60"
            onClick={handleSignInWithGithub}
          >
            <img src={github} className="h-[17px] w-[17px]" />
            <p>Continue With Github</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
