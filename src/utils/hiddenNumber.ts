import { User } from "@/components/AuthContext";

export function hiddenPhone({ whatsapp, isPremium }: User): string {
  const planText = !!isPremium ? "✨ PREMIUM ✨" : "****-";
  return `${planText}${whatsapp?.slice(-4)}`;
}
