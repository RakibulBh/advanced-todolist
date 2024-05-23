"use client";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Chevron = ({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) => {
  return (
    <div className="hover:cursor-pointer" onClick={handleClick}>
      {open ? <ChevronUp /> : <ChevronDown />}
    </div>
  );
};
