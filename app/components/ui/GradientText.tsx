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
  return (
    <Tag className={`text-gradient ${className}`}>{children}</Tag>
  );
}
