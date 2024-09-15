import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collectItem } from "../lib/yutils";
import { useAppStore } from "../lib/zustand";

export default function SelectCategory() {
  const color = useAppStore((store) => store.flowers);

  return (
    color && (
      <Select name="color">
        <SelectTrigger className="w-full]">
          <SelectValue placeholder="Gul rangini tanlang" />
        </SelectTrigger>
        <SelectContent>
          {collectItem(color, "color").map((count) => {
            return (
              <SelectItem key={count} value={count}>
                <div className="flex items-center gap-2">
                  <span
                    style={{ background: count }}
                    className="h-4 border border-black w-4 block rounded-full"
                  ></span>
                  <h1> {count}</h1>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    )
  );
}
