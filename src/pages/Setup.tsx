import React, { useRef, useState } from "react";
import LoginSplash from "../assets/login-splash.jpg";
import tw from "twin.macro";
import { Button, ButtonSize, ButtonVariant } from "../components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { setup } from "../services/user";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { toast } from "react-hot-toast";

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
  const [email, setEmail] = useState("");

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingUsername(true);

    try {
      await checkUsername(username);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({ name, username, email });
    } catch (err) {
    } finally {
      setIsCheckingUsername(false);
    }
  };

  return (
    <form tw="flex-1 flex flex-col" onSubmit={onSubmit}>
      <h1 tw="text-center text-2xl font-medium">Hadi başlayalım</h1>
      <div tw="mt-12 flex flex-col gap-4">
        <div>
          <label>Ad</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            tw="w-full border p-2 rounded"
            required
            minLength={3}
            maxLength={64}
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
              required
              minLength={3}
              maxLength={64}
            />
          </div>
        </div>

        <div>
          <label>Eposta</label>
          <div tw="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              tw="w-full border p-2 rounded"
              required
              minLength={3}
              maxLength={64}
            />
          </div>
        </div>
      </div>

      <div tw="mt-auto mb-4">
        <Button fullWidth size={ButtonSize.LARGE} disabled={isCheckingUsername}>
          {isCheckingUsername ? "Kullanıcı adı kontrol ediliyor..." : "Devam"}
        </Button>
      </div>
    </form>
  );
}

function Step2({ onComplete }: { onComplete: (data: Object) => void }) {
  const defaultImage =
    "https://www.arweave.net/01H1V-i5ikyQvXof2vXsdOMbOpjWkaj7L1QXkWRa3Io?ext=png";

  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingUsername(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({ image: imageFile });
    } catch (err) {
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    const fr = new FileReader();

    fr.onload = () => {
      const url = fr.result as string;
      setImage(url);
      setImageFile(file);
    };
    fr.readAsDataURL(file);
  };

  return (
    <form tw="flex-1 flex flex-col" onSubmit={onSubmit}>
      <h1 tw="text-center text-2xl font-medium">İstersen resim yükle</h1>
      <input
        onInput={onChangeImage}
        accept=".jpg, .jpeg, .png"
        ref={inputRef}
        type="file"
        tw="hidden"
      />
      <div tw="mt-8 flex flex-col gap-4 items-center">
        <img
          src={image || defaultImage}
          tw="w-32 h-32 rounded-full object-center object-cover"
        />
        <Button
          type="button"
          variant={ButtonVariant.SECONDARY}
          onClick={() => inputRef.current?.click()}
        >
          Resim seç
        </Button>
      </div>
      <div tw="mt-auto mb-4">
        <Button fullWidth size={ButtonSize.LARGE} disabled={isCheckingUsername}>
          {isCheckingUsername ? "Resim yükleniyor..." : "Bitir"}
        </Button>
      </div>
    </form>
  );
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
    };
  },
  animate: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
    };
  },
};

const steps = [Step1, Step2];

function Setup() {
  const [[step, direction], setStep] = useState([0, 0]);
  const [formData, setFormData] = useState<any[]>([]);

  const { token, refreshUser } = useFluffyAuth();

  const CurrentStep = steps[step];

  const onCompleteStep = async (step: number, data: Object) => {
    let newFormdata = [...formData];
    newFormdata[step] = data;
    setFormData(newFormdata);

    if (step === steps.length - 1) {
      const data = newFormdata.reduce(
        (prev, curr) => ({ ...prev, ...curr }),
        {}
      );

      const fd = new FormData();
      Object.entries(data).forEach(([k, v]: any) => {
        fd.append(k, v);
      });
      fd.forEach((val) => console.log(val));
      try {
        const resp = await setup(token as string, fd);
        toast.success("Başarıyla kayıt oldunuz!");

        await refreshUser();
      } catch (err) {
        toast.error((err as any).message);
      }
    } else {
      setStep((prev) => [prev[0] + 1, 1]);
    }
  };

  const goBack = () => {
    if (step === 0) return;

    setStep((prev) => [prev[0] - 1, -1]);
  };

  return (
    <div tw="min-h-screen relative flex justify-center items-center">
      <img
        src={LoginSplash}
        tw="absolute w-full h-full object-cover object-center"
      />

      <div tw="p-6 z-10 flex-1 flex justify-center">
        <motion.div
          tw="rounded-xl bg-white z-10 flex-1 max-w-md w-full p-4 h-[28rem] overflow-hidden relative flex flex-col"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              variants={variants}
              custom={direction}
              initial="enter"
              animate="animate"
              exit="exit"
              transition={{
                duration: 1,
                delayChildren: 0.4,
              }}
              tw="flex-1 flex"
              key={step}
            >
              <CurrentStep onComplete={(data) => onCompleteStep(step, data)} />
            </motion.div>
          </AnimatePresence>
          <div tw="mt-auto flex justify-center gap-2 relative">
            <motion.button
              animate={{
                opacity: step === 0 ? 0 : 1,
                visibility: step === 0 ? "hidden" : "visible",
              }}
              tw="absolute left-0 top-1/2 -translate-y-1/2"
              onClick={goBack}
            >
              Geri
            </motion.button>
            {steps.map((_, index) => (
              <div
                key={index}
                css={[
                  tw`border w-2 h-2 rounded-full transition`,
                  step >= index && tw`bg-black`,
                ]}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Setup;
