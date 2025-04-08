import * as React from "react";
export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function DropdownMenuContent({ children, align }: { children: React.ReactNode; align?: string }) {
  return <div>{children}</div>;
}
export function DropdownMenuItem({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
