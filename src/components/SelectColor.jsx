import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collectItem } from "../lib/yutils";
import { useAppStore } from "../lib/zustand";

export default function SelectCategory({ defaultColor }) {
  const color = useAppStore((store) => store.flowers);

  return (
    color && (
      <Select defaultValue={defaultColor && defaultColor} name="color">
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
                    className="block h-4 w-4 rounded-full border border-black"
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
