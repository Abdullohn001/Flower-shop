import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { uploadImage } from "../request";
import { useRef, useState } from "react";

export default function UploadImage() {
  const refImg = useRef(null);
  const [img, setImg] = useState(null);
  console.log(img)

  function handleGetImage(img, type = "local") {
    if (type === "url") {
      setImg(img);
    } else {
      uploadImage(img)
        .then((req) => setImg(req))
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="w-full">
      <Label className="ml-2">Rasim Yuklang..</Label>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label>
            <span
              className={`w-full py-1 ${buttonVariants({ variant: "outline" })}`}
            >
              <PlusCircleIcon />
            </span>
            <Input
              onChange={({ target: { files } }) => handleGetImage(files[0])}
              className="sr-only"
              type="file"
            />
          </Label>
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url" className="mb-1 ml-2">
            Havola*
          </Label>
          <div className="flex w-full items-center gap-2">
            <Input
              ref={refImg}
              id="url"
              placeholder=" Rasimni havolasini kiriting"
              className="w-full"
              type="url"
            />
            <Button type="button" onClick={() => handleGetImage(refImg.current.value, "url")}>
              <PlusIcon />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      {img && <img className="mt-5" height="300px" width="100%" src={img} />}
    </div>
  );
}
