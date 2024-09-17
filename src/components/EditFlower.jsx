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
import { useEffect, useState } from "react";
import { editFlower, refreshToken } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function EditModal({ data, edited, setEdited }) {
  const [letter, setLetter] = useState(0);
  const [loading, setLoading] = useState(false);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const admin = useAppStore((state) => state.admin);
  const editModal = useAppStore((state) => state.editModal);
  const setEditModal = useAppStore((state) => state.setEditModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validition(result);
    if (checker) {
      toast.warning(errorMessage);
    } else {
      setEdited({ ...result, id: data.id });
    }
  };

  useEffect(() => {
    if (edited) {
      setLoading(true);
      editFlower(admin?.access_token, edited)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setEdited(null);
          editModal();
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(() => {
                setAdmin(null);
                toast.info("Tizimga qayta kirin brat");
              });
          }
          toast.error(message);
        })
        .finally(() => setLoading(false));
    }
  }, [admin, edited]);

  return (
    <Dialog open={editModal} onOpenChange={setEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot tahrirlash</DialogTitle>
          <DialogDescription>
            Barcha inputlarni qayta to'ldirish orqali gulni malumotlarini
            yangilashingiz mumkin
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className="flex max-h-96 flex-col gap-3 overflow-y-scroll px-1">
              <div>
                <Label htmlFor="name">Gul nomi*</Label>
                <Input
                  defaultValue={data?.name}
                  id="name"
                  placeholder="Gul nomini kiriting"
                  name="name"
                />
              </div>
              <div>
                <Label htmlFor="price">Narxi*</Label>
                <Input
                  defaultValue={data?.price}
                  type="number"
                  min="0"
                  id="price"
                  placeholder="Gul narxini kiriting"
                  name="price"
                />
              </div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="w-[50%]">
                  <SelectCategory category={data?.category} />
                </div>
                <div className="w-[50%]">
                  <Label>Rangni kiriting</Label>
                  <SelectColor defaultColor={data?.color} className="w-full" />
                </div>
              </div>
              <div>
                <Label>Yashash joyini kiriting</Label>
                <SelectCountry cauntry={data?.country} />
              </div>
              <div>
                <Label htmlFor="summary">Gul haqida ma'lumot*</Label>
                <Textarea
                  defaultValue={data?.summary}
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
                  defaultValue={data?.smell}
                  name="smell"
                  type="text"
                  id="smell"
                  placeholder="Gul hidini kiriting..."
                />
              </div>
              <LifeTime defaultTime={data?.lifetime} />
              <UploadImage defaultImg={data?.imageUrl} />
            </div>
            <div className="mt-5 flex w-full items-center justify-end gap-3">
              <Button onClick={editModal} type="button" variant="outline">
                Bekor qilish
              </Button>
              <Button disabled={loading} className="w-36" type="submit">
                {loading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  "Tasdiqlash"
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
