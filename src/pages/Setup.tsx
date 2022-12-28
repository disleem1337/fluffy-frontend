import React, { useState } from "react";
import LoginSplash from "../assets/login-splash.jpg";
import "twin.macro";
import { Button, ButtonSize } from "../components/Button/Button";

async function checkUsername(username: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

function Step1() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 tw="text-center text-2xl font-medium">Hadi başlayalım</h1>
      <div tw="mt-12 flex flex-col gap-4">
        <div>
          <label>Ad</label>
          <input type="text" tw="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Kullanıcı Adı</label>
          <div tw="relative">
            <span tw="absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none">
              @
            </span>
            <input type="text" tw="w-full border p-2 pl-6 rounded" />
          </div>
        </div>
      </div>

      <div tw="mt-8">
        <Button fullWidth size={ButtonSize.LARGE}>
          Gönder
        </Button>
      </div>
    </form>
  );
}

function Step2() {
  return <div></div>;
}

const steps = [Step1, Step2];
function Setup() {
  const [step, setStep] = useState(0);

  const CurrentStep = steps[step];
  return (
    <div tw="min-h-screen relative flex justify-center items-center">
      <img
        src={LoginSplash}
        tw="absolute w-full h-full object-cover object-center"
      />

      <div tw="p-6 z-10 flex-1 flex justify-center">
        <div tw="rounded-xl bg-white z-10 flex-1 max-w-md w-full p-4">
          {<CurrentStep />}
        </div>
      </div>
    </div>
  );
}

export default Setup;
