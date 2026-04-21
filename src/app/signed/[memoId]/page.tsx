import { notFound } from "next/navigation";
import { SignedMemoView } from "@/components/signed-memo-view";
import { MEMOS, getMemo } from "@/lib/memos";

export function generateStaticParams() {
  return MEMOS.map((m) => ({ memoId: m.slug }));
}

export const dynamicParams = false;

export default async function SignedPage({
  params,
}: {
  params: Promise<{ memoId: string }>;
}) {
  const { memoId } = await params;
  const memo = getMemo(memoId);
  if (!memo) notFound();
  return <SignedMemoView memo={memo} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ memoId: string }>;
}) {
  const { memoId } = await params;
  const memo = getMemo(memoId);
  if (!memo) return { title: "Signed memo · Dossier" };
  return {
    title: `${memo.company} · SIGNED ${memo.pipelineHash} · Dossier`,
    description: `Signed memo · ${memo.company} · pipeline ${memo.pipeline} · ${memo.pipelineHash}`,
  };
}
