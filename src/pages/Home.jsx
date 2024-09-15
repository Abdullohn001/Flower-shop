import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { getFlowers, refreshToken } from "../request";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import AddNewItemModal from "../components/AddNewItemModal";
import { dollar } from "../lib/yutils";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const flowers = useAppStore((state) => state.flowers);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  useEffect(() => {
    setLoading(true);
    getFlowers(admin?.access_token)
      .then(({ data }) => {
        setFlowers(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              setAdmin({ ...admin, access_token });
            })
            .catch(() => {
              toast.info("Tizimga qayta kiring!");
              setAdmin(null);
            });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [admin]);

  return (
    <>
      <div className="base-container h-[845px] overflow-y-scroll">
        <div className="mb-5 flex items-center justify-between border-b py-5">
          <h2 className="h2">Boshqaruv paneli</h2>
          <Button disabled={!flowers} onClick={() => setAddItemModal(true)}>
            Qo'shish
            <PlusIcon className="ml-2" />
          </Button>
        </div>
        <Table>
          {flowers && <TableCaption>Gullar haqida ma'lumot.</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Gul Nomi</TableHead>
              <TableHead>Turkumi</TableHead>
              <TableHead>Rangi</TableHead>
              <TableHead className="text-right">Narxi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flowers &&
              flowers.map(({ id, name, category, color, price }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>
                      <span
                        style={{ background: color }}
                        className="block h-4 w-4 rounded-full border"
                      ></span>
                    </TableCell>
                    <TableCell className="text-right">
                      {price * dollar},00 so'm
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {loading && (
          <div className="mt-5 flex w-full items-center justify-center gap-3 font-bold">
            <UpdateIcon className="animate-spin" />
            <h3>Yuklanmoqda...</h3>
          </div>
        )}
      </div>

      <AddNewItemModal />
    </>
  );
}
