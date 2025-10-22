import React from "react";

interface TitlePersonalizadoProps {
  children: React.ReactNode;
  className?: string;
}

export default function TitlePersonalizado({
  children,
  className = "",
}: TitlePersonalizadoProps) {
  return <h1 className={`text-2xl font-bold mb-4 ${className}`}>{children}</h1>;
}
