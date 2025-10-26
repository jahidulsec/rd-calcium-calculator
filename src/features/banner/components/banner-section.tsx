"use client";

import BannerCard from "@/components/card/banner-card";
import { banner } from "@/generated/prisma";
import React from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFrameOff, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal/alert-modal";
import { toast } from "sonner";
import { deleteBanner } from "../actions/banner";

export default function BannerSection({ data }: { data: banner[] }) {
  const [del, setDel] = React.useState<string | boolean>(false);

  if (data.length === 0)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFrameOff />
          </EmptyMedia>
          <EmptyTitle>No Banners Yet</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );

  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        {data.map((item) => (
          <div key={item.id} className="w-full max-w-sm border rounded-md">
            <div className="flex justify-between items-center gap-3 text-sm px-1">
              <p>{item.image?.split("/").pop()?.slice(37)}</p>
              <Button
                variant={"ghost"}
                className="text-destructive"
                onClick={() => setDel(item.id)}
              >
                <IconTrash />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <BannerCard
              src={`/api/upload/banner/${item.id}`}
              alt="Banner"
              className="max-w-sm border"
            />
          </div>
        ))}
      </div>

      <AlertModal
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          if (typeof del === "string") {
            toast.promise(deleteBanner(del), {
              loading: "Loading...",
              success: (data) => {
                if (!data.success) throw data;
                return data.message;
              },
              error: (data) => {
                return data.message;
              },
            });
          }
        }}
      />
    </>
  );
}
