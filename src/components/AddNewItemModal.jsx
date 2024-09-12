import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getFormData } from "../lib/yutils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";

export default function AddNewItemModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    console.log(result);
  };

  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  return ;
}
