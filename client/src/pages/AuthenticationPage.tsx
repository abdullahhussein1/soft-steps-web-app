import supabase from "@/supabase/supabase";
import github from "../assets/images/github.png";
import google from "../assets/images/google.png";
import favIcon from "../assets/images/blue.png";
import palestineCountryFilledIcon from "../assets/images/palestineCountryFilled.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

const AuthenticationPage = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>();
  supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
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
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });
  }
  async function handleSignInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: import.meta.env.VITE_BASE_URL as string,
      },
    });
  }

  useEffect(() => {
    console.log(session);
    if (session) navigate("/");
  }, [session, navigate]);

  return (
    <div className="h-[100dvh] bg-black p-8 text-white">
      <div className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-center">
        <div className="absolute top-0 flex flex-col items-start gap-1 self-start">
          <div className="flex items-center gap-1 text-xl font-semibold">
            <img src={favIcon} alt="favIcon" className="h-7 w-7" />
            <h1 className="text-xl font-semibold">Soft Steps</h1>
          </div>
          <p className="text-[10px] font-light text-neutral-500 sm:text-xs">
            You will surely find the most bitter towards the believers to be the
            Jews and polytheists [5:82]
          </p>
        </div>
        <img
          src={palestineCountryFilledIcon}
          alt="palestineCountryFilledIcon"
          className="absolute h-full w-full justify-self-center object-cover opacity-10 brightness-50"
        />
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-xl font-medium">Get started</h1>
          <p className="text-xs font-thin">
            Sign In/Up to take your new steps easier towards your goals
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
        <p className="absolute bottom-0 text-justify text-[10px] font-light text-neutral-500 sm:text-xs">
          Believers should not take disbelievers as guardians instead of the
          believers, and whoever does so will have nothing to hope for from
          Allah, unless it is a precaution against their tyranny. And Allah
          warns you about Himself. And to Allah is the final return. [3:28]
        </p>
      </div>
    </div>
  );
};

export default AuthenticationPage;
