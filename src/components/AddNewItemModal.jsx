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

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot qo'shish</DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label htmlFor="name" className="ml-2">
                Gul nomi*
              </Label>
              <Input id="name" placeholder="Gul nomini kiriting" name="name" />
            </div>
            <div className="mb-3">
              <Label htmlFor="price" className="ml-2">
                Narxi*
              </Label>
              <Input
                id="price"
                placeholder="Gul narxini kiriting"
                name="price"
              />
            </div>
            <div className="mb-3 flex items-center justify-between">
              <SelectCategory />
              <SelectColor />
            </div>
            <div>
              <SelectCountry />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
