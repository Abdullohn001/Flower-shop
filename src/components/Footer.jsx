import { buttonVariants } from "@/components/ui/button";

export default function Footer() {
  return (
    <div className="flex font-medium h-14 items-center justify-center border-t">
      Powered by{"  "}
      <a
        className={`${buttonVariants({ variant: "link" })}`}
        target="blank"
        href="https://json-api.uz"
      >
        json-api.uz
      </a>
    </div>
  );
}
