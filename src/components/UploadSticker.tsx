import { CrossIcon, FileImage, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { environment } from "@/utils/environment";
import { parseCookies } from "nookies";
import { event } from "@/utils/gtag";
import { Controller, useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import ImageCrop from "./ImageCrop";
import { useCrop } from "@/hooks/useCrop";
import { useReward } from "react-rewards";

export const UploadSticker = () => {
  const { isLogged, openLogin, user } = useAuth();
  const [isCropUsed, setIsCropUsed] = useState(false)
  const [accept, setAccept] = useState("image/png, image/webp, image/jpeg")
  const [sticker, setSticker] = useState<File | Blob | null>(null);
  const previewImagem = useMemo(
    () => (sticker ? URL.createObjectURL(sticker) : null),
    [sticker]
  );
  const crop = useCrop()
  const { reward } = useReward('sticker-id', 'confetti', {
    elementCount: 300,
  });

  const {
    handleSubmit,
    reset,
    getValues,
    formState: {
      isSubmitting
    }
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { name } = getValues();

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const FIRST_ITEM = 0;

    const selectedFile = files.item(FIRST_ITEM);
    //TODO: add toast
    if (!selectedFile) return;
    const maxAllowedSize = 25 * 1024 * 1024;
    setSticker(selectedFile?.size > maxAllowedSize ? null : selectedFile);
  }

  const generateFormData = useCallback(async () => {
    try {
      const body = new FormData();
      if (!sticker) {
        // TODO: add toast
        alert("Deu erro ao editar sua imagem.");
        return;
      }
      body.append("file", sticker);
      if (isCropUsed) {
        body.append("name", name || "");
        body.append("y", String(crop.croppedAreaPixels?.y));
        body.append("x", String(crop.croppedAreaPixels?.x));
      }

      const response = await fetch(`${environment.APIURL}/stickers`, {
        method: "POST",
        body,
        credentials: 'include'
      }).then((res) => res.json());
      if (response.error) {
        //TODO: add toast
        alert(response.error);
        return;
      }
      reward()

      alert(response.message);
    } catch (error) {
      // TODO: add toast
      console.log(error);
    } finally {
      setSticker(null);
      crop.reset();
      reset();
    }
  }, [crop, isCropUsed, name, reset, reward, sticker]);

  const onSubmit = useCallback(async () => {
    try {
      if (!isLogged) {
        //TODO: toast
        return;
      }
      await generateFormData();
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  }, [generateFormData, isLogged, reset])


  const handlePaste = (e: ClipboardEvent) => {
    const item = Array.from(e.clipboardData?.items || []).find((x) =>
      /^image\//.test(x.type)
    );

    if (item) {
      const blob = item.getAsFile();

      if (blob) {
        setSticker(blob);
      }
    }
  };


  useEffect(() => {
    if (user?.isPremium) {
      setAccept('image/gif')
    }
  }, [user])

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div id="sticker-id" className="flex flex-col lg:flex-row flex-1 justify-center items-center gap-4">
      <div className="flex flex-col gap-3">
        {!!previewImagem ? (
          <label htmlFor="file-upload-preview">
            <Image
              className="rounded w-[500px] h-[500px] border-2 border-gray-900/25"
              alt="preview da figurinha"
              width={500}
              height={500}
              src={previewImagem}
              objectPosition="center"
              objectFit="cover"
              priority
            />
          </label>
        ) : (
          <label className="flex w-[500px] h-[500px] justify-center items-center rounded-lg border border-dashed border-gray-900/25 p-6 cursor-pointer"
            htmlFor="file-upload"
          >
            <div className="text-center">
              <ImageIcon
                className="mx-auto h-16 w-16 text-gray-400"
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                <strong>Transforme suas imagens</strong> em figurinhas mágicas!
                <label
                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>Faça o upload</span>

                  {!isLogged ? (
                    <button onClick={() => openLogin({})}
                      id="file-upload"
                    />
                  ) : (
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileSelected}
                      accept={accept}
                    />
                  )}
                </label>
                <p className="pl-1"> e veja a mágicas acontecer. 🪄</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, {user?.isPremium && 'GIF,'} WEBP até 25MB
              </p>
            </div>
          </label >
        )}
        <div className="flex flex-col gap-1">
          <button
            aria-label="Remover a imagem selecionada"
            className="rounded bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => setSticker(null)}
            disabled={!sticker || isSubmitting}
          >
            Remover
          </button>

          <button
            type="button"
            aria-label="Gerar figurinha para receber pelo Whatsapp"
            className="rounded bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              event({
                action: "upload_image",
                label: "envio de imagem",
                category: "upload",
                value: 1,
              });
              return handleSubmit(onSubmit)()
            }}
            disabled={!sticker || isSubmitting}
          >
            {isSubmitting ? "Gerando e enviando ..." : "Gerar figurinha 🪄"}
          </button>
        </div>
      </div >
    </div >
  );
};
