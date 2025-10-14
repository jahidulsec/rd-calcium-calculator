"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MmarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1(props) {
          const { node, ...rest } = props;
          return (
            <h1
              className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance"
              {...rest}
            />
          );
        },
        h2(props) {
          const { node, ...rest } = props;
          return (
            <h2
              className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
              {...rest}
            />
          );
        },
        h3(props) {
          const { node, ...rest } = props;
          return (
            <h3
              className="scroll-m-20 text-xl font-semibold tracking-tight"
              {...rest}
            />
          );
        },
        h4(props) {
          const { node, ...rest } = props;
          return (
            <h4
              className="scroll-m-20 text-lg font-semibold tracking-tight"
              {...rest}
            />
          );
        },

        p(props) {
          const { node, ...rest } = props;
          return (
            <p className="leading-7 [&:not(:first-child)]:mt-6" {...rest} />
          );
        },
        table(props) {
          const { node, ...rest } = props;
          return <table className="w-full my-3" {...rest} />;
        },
        tr(props) {
          const { node, ...rest } = props;
          return <tr className="even:bg-muted m-0 border-t p-0" {...rest} />;
        },
        td(props) {
          const { node, ...rest } = props;
          return (
            <td
              className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              {...rest}
            />
          );
        },
        th(props) {
          const { node, ...rest } = props;
          return (
            <th
              className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              {...rest}
            />
          );
        },
        ul(props) {
          const { node, ...rest } = props;
          return <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...rest} />;
        },
        ol(props) {
          const { node, ...rest } = props;
          return <ul className="my-6 ml-6 list-decimal [&>li]:mt-2" {...rest} />;
        },
        hr(props) {
          const { node, ...rest } = props;
          return <hr className={cn("my-6 border-0")} {...rest} />;
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
