"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-cyber-border group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-cyber-blue group-[.toast]:text-black",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:bg-red-950 group-[.toaster]:text-red-100 group-[.toaster]:border-red-900",
          success: "group-[.toaster]:bg-emerald-950 group-[.toaster]:text-emerald-100 group-[.toaster]:border-emerald-900",
          warning: "group-[.toaster]:bg-amber-950 group-[.toaster]:text-amber-100 group-[.toaster]:border-amber-900",
          info: "group-[.toaster]:bg-cyan-950 group-[.toaster]:text-cyan-100 group-[.toaster]:border-cyan-900",
        },
      }}
      {...props}
    />
  );
};
