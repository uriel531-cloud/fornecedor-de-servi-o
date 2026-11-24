"use client";

import { LeadFormInner } from "./forms";

export function LeadForm(props: { origem: string; servico?: string; compact?: boolean }) {
  return <LeadFormInner {...props} />;
}
