import React, { useRef, useState } from "react";
import LoginSplash from "../assets/login-splash.jpg";
import tw from "twin.macro";
import { Button, ButtonSize } from "../components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

async function checkUsername(username: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

function Step1({ onComplete }: { onComplete: (data: Object) => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingUsername(true);

    try {
      await checkUsername(username);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({ name, username });
    } catch (err) {
    } finally {
      setIsCheckingUsername(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 tw="text-center text-2xl font-medium">Hadi başlayalım</h1>
      <div tw="mt-12 flex flex-col gap-4">
        <div>
          <label>Ad</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            tw="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>Kullanıcı Adı</label>
          <div tw="relative">
            <span tw="absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none">
              @
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              tw="w-full border p-2 pl-6 rounded"
            />
          </div>
        </div>
      </div>

      <div tw="mt-8">
        <Button fullWidth size={ButtonSize.LARGE} disabled={isCheckingUsername}>
          {isCheckingUsername ? "Kullanıcı adı kontrol ediliyor..." : "Devam"}
        </Button>
      </div>
    </form>
  );
}

function Step2({ onComplete }: { onComplete: (data: Object) => void }) {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingUsername(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({});
    } catch (err) {
    } finally {
      setIsCheckingUsername(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 tw="text-center text-2xl font-medium">Devaaaaaaam</h1>
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
        <Button fullWidth size={ButtonSize.LARGE} disabled={isCheckingUsername}>
          {isCheckingUsername ? "Kullanıcı adı kontrol ediliyor..." : "Devam"}
        </Button>
      </div>
    </form>
  );
}

const steps = [Step1, Step2];
function Setup() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const lastStep = useRef(-1);

  const CurrentStep = steps[step];

  const onCompleteStep = (step: number, data: Object) => {
    setFormData((prev) => ({ ...prev, [step]: data }));

    if (step === steps.length - 1) {
    } else {
      lastStep.current = step;
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step === 0) return;

    lastStep.current = step;
    setStep(step - 1);
  };
  return (
    <div tw="min-h-screen relative flex justify-center items-center">
      <img
        src={LoginSplash}
        tw="absolute w-full h-full object-cover object-center"
      />

      <div tw="p-6 z-10 flex-1 flex justify-center">
        <motion.div
          tw="rounded-xl bg-white z-10 flex-1 max-w-md w-full p-4 h-96 overflow-hidden"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            <motion.div
              initial={{
                x: step > lastStep.current ? "100%" : "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: step > lastStep.current ? "100%" : "-100%",
              }}
              transition={{
                duration: 5,
              }}
              key={step}
            >
              {
                <CurrentStep
                  key={step}
                  onComplete={(data) => onCompleteStep(step, data)}
                />
              }
            </motion.div>
          </AnimatePresence>
          <div tw="mt-4 flex justify-center gap-2">
            <span onClick={goBack}>Back</span>
            {steps.map((_, index) => (
              <div css={[tw`p-1 border rounded-full`]}>
                <div
                  css={[
                    tw`w-4 h-4 rounded-full transition`,
                    step >= index && tw`bg-black`,
                  ]}
                ></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Setup;
