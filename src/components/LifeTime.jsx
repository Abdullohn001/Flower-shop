import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LifeTime() {
  return (
      <div className="mb-3">
        <Label>Gulning eng uzoq yashash davri </Label>
        <div className="flex gap-3">
          <Input
            name="lifetime"
            placeholder="Davrni haftada kiriting"
            className="w-full"
            type="number"
          />
        </div>
      </div>
  );
}
