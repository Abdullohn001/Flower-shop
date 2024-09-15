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
  const country = useAppStore((store) => store.flowers);

  return (
    country && (
      <Select name="country">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Yashash joyini tanlang" />
        </SelectTrigger>
        <SelectContent>
          {collectItem(country, "country").map((count) => {
            return (
              <SelectItem key={count} value={count}>
                {count}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    )
  );
}
