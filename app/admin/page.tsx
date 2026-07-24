import LeadsTable, { LeadItem } from '@/components/LeadsTable';
import { fetchLeads } from '@/app/actions';

export const revalidate = 0; // Dynamic route

export default async function AdminPage() {
  let leads: LeadItem[] = [];

  try {
    leads = await fetchLeads() as LeadItem[];
  } catch (err: any) {
    console.error('Failed to fetch leads on admin page:', err.message);
  }

  return <LeadsTable initialLeads={leads} />;
}
