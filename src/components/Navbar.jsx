import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui//button";
import { IoIosLogOut } from "react-icons/io";
import { useAppStore } from "../lib/zustand";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const admin = useAppStore((state) => state.setAdmin);
  function logOut() {
    const cheker = confirm("Rostdan ham tizimdan chiqmoqchimisz ?");
    cheker && admin(null);
  }
  return (
    <div className="flex h-16 items-center shadow-sm">
      <div className="base-container flex justify-between">
        <NavLink className="text-xl font-bold">Flower app</NavLink>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" onClick={logOut} className="gap-2">
            Chiqish <IoIosLogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}
