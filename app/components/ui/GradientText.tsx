import type { ElementType, ReactNode } from "react";

export default function GradientText({
  children,
  as: Tag = "span",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={`gradient-text ${className}`}>{children}</Tag>;
}
