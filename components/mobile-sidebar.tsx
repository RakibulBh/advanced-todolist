import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="mt-5" asChild>
        <Menu size={35} />
      </SheetTrigger>
      <SheetContent
        className="block md:hidden p-0 w-[250px] rounded-r-xl"
        side="left"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
