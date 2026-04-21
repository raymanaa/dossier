import { MemosIndex } from "@/components/memos-index";
import { MEMOS } from "@/lib/memos";

export default function AppIndexPage() {
  return <MemosIndex memos={MEMOS} />;
}
