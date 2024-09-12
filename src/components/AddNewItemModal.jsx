import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "@/components/SelectCategory";
import SelectColor from "@/components/SelectColor";
import SelectCountry from "@/components/SelectCountry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "../lib/zustand";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddNewItemModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
  };

  const addItem = useAppStore((state) => state.addItemModal);
  const addnewItem = useAppStore((state) => state.setAddItemModal);
  return (
    <Dialog open={addItem} onOpenChange={addnewItem}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot qo'shish</DialogTitle>
          <DialogDescription>
            Barcha malumotlarni toldirish orqali yangi gulni sotuvga
            chiqarishingiz mumkin
          </DialogDescription>

          <form className="gap-3 flex flex-col" onSubmit={handleSubmit}>
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
              <div className="w-[50%]">
                <Label>Turkumni Tanlang</Label>
                <SelectCategory />
              </div>
              <div className="w-[50%]">
                <Label>Rangni kiriting</Label>
                <SelectColor className="w-full" />
              </div>
            </div>
            <div>
              <Label>Yashash joyini kiriting</Label>
              <SelectCountry />
            </div>
            <div>
              <Label>Gul haqida malumot kiriting</Label>
              <Textarea />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
