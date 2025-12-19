import React from "react";

interface TitlePersonalizadoProps {
  children: React.ReactNode;
  className?: string;
}

export default function TitlePersonalizado({
  children,
  className = "font-bold mb-4",
}: TitlePersonalizadoProps) {
  return <h1 className={`text-2xl ${className}`}>{children}</h1>;
}
