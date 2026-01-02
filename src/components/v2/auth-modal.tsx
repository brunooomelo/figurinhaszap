import { useState } from "react";
import { Lock, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignIn, useAuthenticate } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phoneNumber: string) => void;
}

const countryCodes = [
  { code: "BR", dial: "+55", flag: "🇧🇷" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "PT", dial: "+351", flag: "🇵🇹" },
  { code: "ES", dial: "+34", flag: "🇪🇸" },
  { code: "AR", dial: "+54", flag: "🇦🇷" },
  { code: "MX", dial: "+52", flag: "🇲🇽" },
];

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "pin">("phone");
  const [countryCode, setCountryCode] = useState("BR");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");

  const signInMutation = useSignIn();
  const authenticateMutation = useAuthenticate();

  const isLoading = signInMutation.isPending || authenticateMutation.isPending;
  const selectedCountry = countryCodes.find((c) => c.code === countryCode);

  const handleSendPin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Digite um número de telefone válido");
      return;
    }

    const fullNumber = `${selectedCountry?.dial}${phoneNumber}`;
    
    signInMutation.mutate(fullNumber, {
      onSuccess: () => {
        toast.success("PIN enviado!", {
          description: "Verifique seu WhatsApp para o código de 6 dígitos.",
        });
        setStep("pin");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleVerifyPin = async () => {
    if (pin.length !== 6) {
      toast.error("Digite o PIN completo de 6 dígitos");
      return;
    }

    const fullNumber = `${selectedCountry?.dial}${phoneNumber}`;
    
    authenticateMutation.mutate(
      { phoneNumber: fullNumber, otp: pin },
      {
        onSuccess: () => {
          toast.success("Autenticação realizada!", {
            description: "Agora você pode criar e compartilhar figurinhas.",
          });
          onSuccess(fullNumber);
          handleReset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleReset = () => {
    setStep("phone");
    setPhoneNumber("");
    setPin("");
  };

  const handleBack = () => {
    setStep("phone");
    setPin("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl border-2 border-border p-0 overflow-hidden">
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Bem-vindo ao nosso gerador
              </DialogTitle>
              <p className="text-sm opacity-90 mt-1">
                Autentique-se para criar figurinhas
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {step === "phone" ? (
            <>
              <p className="text-muted-foreground text-sm">
                Para proporcionar uma experiência personalizada e segura, solicitamos seu
                número de WhatsApp{" "}
                <span className="font-semibold text-foreground">
                  apenas para te enviar a figurinha
                </span>
                .
              </p>

              <div className="space-y-3">
                <Label className="text-sm font-medium">WhatsApp</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[100px] h-12 rounded-xl border-2">
                      <SelectValue>
                        {selectedCountry?.flag} {selectedCountry?.code}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code} ({country.dial})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="(12) 93456-7890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 h-12 rounded-xl border-2"
                    maxLength={11}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Seus dados serão usados exclusivamente para fins de autenticação e
                  comunicação relacionados ao sistema. Obrigado por escolher nosso sistema.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-12 rounded-xl border-2"
                >
                  Voltar
                </Button>
                <Button
                  variant="whatsapp"
                  onClick={handleSendPin}
                  disabled={isLoading || !phoneNumber}
                  className="flex-1 h-12 rounded-xl"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Próximo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  <Lock className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Digite o código de 6 dígitos enviado para
                </p>
                <p className="font-semibold">
                  {selectedCountry?.dial} {phoneNumber}
                </p>
              </div>

              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={pin}
                  onChange={setPin}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-14 text-xl rounded-xl border-2 border-border bg-muted/50"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                onClick={handleSendPin}
                className="text-sm text-primary hover:underline w-full text-center"
              >
                Reenviar código
              </button>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 rounded-xl border-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  variant="whatsapp"
                  onClick={handleVerifyPin}
                  disabled={isLoading || pin.length !== 6}
                  className="flex-1 h-12 rounded-xl"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Verificar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
