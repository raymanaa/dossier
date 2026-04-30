import { notFound } from "next/navigation";
import { MemoReader } from "@/components/memo-reader";
import { MEMOS, getMemo } from "@/lib/memos";

export function generateStaticParams() {
  return MEMOS.map((m) => ({ memoId: m.slug }));
}

export const dynamicParams = false;

export default async function MemoPage({
  params,
}: {
  params: Promise<{ memoId: string }>;
}) {
  const { memoId } = await params;
  const memo = getMemo(memoId);
  if (!memo) notFound();
  return <MemoReader memo={memo} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ memoId: string }>;
}) {
  const { memoId } = await params;
  const memo = getMemo(memoId);
  if (!memo) return { title: "Memo — Dossier" };
  return {
    title: `${memo.company} — ${memo.id.toUpperCase()} · Dossier`,
    description: memo.summary,
  };
}
