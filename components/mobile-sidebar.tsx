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
      <SheetTrigger className="mt-8 px-2" asChild>
        <Menu size={50} />
      </SheetTrigger>
      <SheetContent className="block md:hidden p-0 w-[250px]" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
