import React from "react";

export default function Navlink({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="w-full flex">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}
