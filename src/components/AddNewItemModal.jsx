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
import LifeTime from "./LifeTime";
import UploadImage from "./UploadImage";
import { getFormData, validition } from "../lib/yutils";
import { toast } from "sonner";
import { useState } from "react";

export default function AddNewItemModal() {
  const [letter, setLetter] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validition(result);

    if (checker) {
      toast.warning(errorMessage);
    }
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

          <form className="" onSubmit={handleSubmit}>
            <div className="flex max-h-96 flex-col gap-3 overflow-y-scroll px-1">
              <div>
                <Label htmlFor="name">Gul nomi*</Label>
                <Input
                  id="name"
                  placeholder="Gul nomini kiriting"
                  name="name"
                />
              </div>
              <div>
                <Label htmlFor="price">Narxi*</Label>
                <Input
                  type="number"
                  min="0"
                  id="price"
                  placeholder="Gul narxini kiriting"
                  name="price"
                />
              </div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="w-[50%]">
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
                <Label htmlFor="summary">Gul haqida ma'lumot*</Label>
                <Textarea
                  name="summary"
                  placeholder="Gul haqida ma'lumot kiriting..."
                  id="summary"
                  maxLength="200"
                  onChange={(e) => {
                    let letter = e.target.value;
                    setLetter(letter.length);
                  }}
                />
                <span className="flex items-center justify-end text-muted-foreground">
                  {letter}/250
                </span>
              </div>
              <div>
                <Label htmlFor="smell">Hid*</Label>
                <Input
                  name="smell"
                  type="text"
                  id="smell"
                  placeholder="Gul hidini kiriting..."
                />
              </div>
              <LifeTime />
              <UploadImage />
            </div>
            <div className="mt-5 flex w-full items-center justify-end gap-3">
              <Button onClick={addnewItem} type="button" variant="outline">
                Bekor qilish
              </Button>
              <Button className="w-36" type="submit">
                Yuklash
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
