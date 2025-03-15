'use client'
import * as Dialog from "@radix-ui/react-dialog";

import { Controller, useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import {
  parsePhoneNumberFromString,
  isValidNumber,
} from "libphonenumber-js";
import { event } from "@/utils/gtag";
import { X } from "lucide-react";
import { PhoneInput } from "./ui/phoneNumber";

const validatePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) return false;
  return isValidNumber(value);
};

export const LoginForm = () => {
  const { openLogin, login, isOpen, isLogged, user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    defaultValues: {
      whatsapp: "",
      country: "+55",
    },
  });

  const onSubmit = async (data: { whatsapp: string; country: string }) => {
    try {
      const whatsapp = data.whatsapp.trim().replace(/[^\d_]/g, "")
      if (!whatsapp) return
      await login({ whatsapp })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog.Root
      open={isOpen && !user && !isLogged}
      onOpenChange={(state) =>
        openLogin({ status: state })
      }
    >
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-900/60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          asChild
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className="text-zinc-900 m-0 text-[17px] font-medium">
              Bem-vindo ao nosso gerador
            </Dialog.Title>
            <Dialog.Description className="text-zinc-600 mt-[10px] mb-5 text-[15px] leading-normal">
              Para proporcionar uma experiência personalizada e segura,
              solicitamos seu número de whatsapp{" "}
              <strong>apenas para te enviar a figurinha</strong>.
            </Dialog.Description>

            <Controller
              control={control}
              name="whatsapp"
              rules={{
                required: "O número de telefone é obrigatório.",
                validate: validatePhoneNumber,
              }}
              render={(props) => {
                return (
                  <div>
                    <label
                      className="block text-sm font-medium leading-6 text-gray-900"
                      htmlFor={props.field.name}
                    >
                      Whatsapp
                    </label>
                    <PhoneInput
                      {...props.field}
                      type="text"
                      id={props.field.name}
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      defaultCountry="BR"
                    />
                  </div>
                );
              }}
            />

            <span className="text-xs text-zinc-400 leading-none">
              Seus dados serão usados exclusivamente para fins de autenticação e
              comunicação relacionados ao sistema. Obrigado por escolher nosso
              sistema.
            </span>
            <div className="mt-[25px] flex justify-end gap-4">
              <button
                aria-label="Voltar e fechar a tela de autenticação"
                data-loading={isSubmitting}
                type="button"
                className="inline-flex h-[35px] border items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none data-[loading=true]:cursor-not-allowed"
                onClick={() => openLogin({ status: false })}
                disabled={isSubmitting}
              >
                Voltar
              </button>
              <button
                aria-label="Próximo: ir para a pagina de autenticação com PIN"
                data-loading={isSubmitting}
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-400 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none data-[loading=true]:cursor-not-allowed disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={isSubmitting || !isValid}
                onClick={() => event({
                  action: 'authenticate',
                  label: 'autenticacao',
                  category: 'login',
                  value: 1
                })}
              >
                {isSubmitting ? "Enviando...." : "Próximo"}
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <X />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
