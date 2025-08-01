"use client";

import { Slot } from "@radix-ui/react-slot";
import { Filter, Loader2, LucideIcon, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BaseButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  clickAction?: "default" | "sign-out" | "create" | "filters" | "edit"
  Icon?: LucideIcon
  href?: string
  asChild?: boolean
}

export const BaseButton = ({
  children,
  isLoading,
  loadingText,
  className,
  disabled,
  clickAction = "default",
  Icon,
  asChild = false,
  href,
  ...props
}: BaseButtonProps) => {
  // Se tem href, força o uso de asChild com Link
  if (href) {
    return (
      <Button
        className={cn("w-full space-x-3 hover:cursor-pointer", className)}
        disabled={disabled || isLoading}
        asChild
        {...props}
      >
        <Link href={href}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {loadingText || children}
            </>
          ) : (
            <>
              {clickAction === "create" && <Plus className="mr-1 size-4 " />}
              {clickAction === "filters" && <Filter className="mr-1 size-4 " />}
              {clickAction === "edit" && <Pencil className="mr-1 size-4 " />}
              {Icon && <Icon className="mr-1 size-4" />}
              {children}
            </>
          )}
        </Link>
      </Button>
    );
  }

  const Comp = asChild ? Slot : Button;

  return (
    <Comp
      className={cn("w-full space-x-3 hover:cursor-pointer", className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {clickAction === "create" && <Plus className="mr-1 size-4 " />}
          {clickAction === "filters" && <Filter className="mr-1 size-4 " />}
          {clickAction === "edit" && <Pencil className="mr-1 size-4 " />}
          {Icon && <Icon className="mr-1 size-4" />}
          {children}
        </>
      )}
    </Comp>
  );
};