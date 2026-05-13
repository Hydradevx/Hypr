import { toast } from "sonner";

export function showSuccess(message: string) {
  toast(message, {
    className: "bg-[#0f172a] text-green-300 border border-green-600",
  });
}

export function showError(message: string) {
  toast(message, {
    className: "bg-[#0f172a] text-red-300 border border-red-600",
  });
}
