'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { updateLeadStatus } from '@/app/actions';

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  budget_range: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Closed';
  created_at: string;
}

interface LeadsTableProps {
  initialLeads: LeadItem[];
}

export default function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  // Subscribe to Supabase Realtime changes
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase
      .channel('leads-realtime-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newLead = payload.new as LeadItem;
            setLeads((prev) => {
              if (prev.some((lead) => lead.id === newLead.id)) return prev;
              return [newLead, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedLead = payload.new as LeadItem;
            setLeads((prev) =>
              prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedLead = payload.old as { id: string };
            setLeads((prev) => prev.filter((lead) => lead.id !== deletedLead.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Status Change Handler with Optimistic UI update
  const handleStatusChange = async (leadId: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    setUpdatingId(leadId);
    
    // Optimistic update
    setLeads((prev: LeadItem[]) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );

    try {
      await updateLeadStatus(leadId, newStatus);
    } catch (err) {
      console.error('Failed to update status in DB via Server Action:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Logout handler
  const handleLogout = () => {
    document.cookie = 'inflo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
    router.refresh();
  };

  // CSV Export handler
  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Budget Range', 'Status', 'Submitted At', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.budget_range,
      l.status,
      new Date(l.created_at).toLocaleString(),
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inflo_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTab = activeTab === 'All' || lead.status === activeTab;

    return matchesSearch && matchesTab;
  });

  // KPI calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const closedLeads = leads.filter((l) => l.status === 'Closed').length;

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto py-6">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-black">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-black flex items-center gap-3">
            <span>Lead Intelligence Ledger</span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#E4572E] text-[#F4EFE6] uppercase tracking-wider">
              Live
            </span>
          </h1>
          <p className="text-black/60 text-xs font-mono mt-1 uppercase tracking-wider">Manage, qualifying and close pipeline</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-mono text-[11px] uppercase tracking-wider">
          <button
            onClick={exportCSV}
            className="flex-grow sm:flex-grow-0 px-4 py-2 border-2 border-black bg-[#F4EFE6] text-black font-bold hover:bg-black hover:text-[#F4EFE6] transition shadow-sm"
          >
            📥 Export CSV
          </button>

          <button
            onClick={handleLogout}
            className="flex-grow sm:flex-grow-0 px-4 py-2 border-2 border-black bg-black text-[#F4EFE6] font-bold hover:bg-[#E4572E] transition shadow-sm"
          >
            Sign Out ↵
          </button>
        </div>
      </div>

      {/* Summary Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border-2 border-black bg-[#F4EFE6] p-5 relative rounded-none shadow-sm">
          <div className="absolute -top-2.5 left-4 bg-[#F4EFE6] px-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-black/50">
            Plate 01
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/60">Total Leads</div>
          <div className="font-serif text-4xl mt-2 font-bold">{totalLeads}</div>
        </div>

        <div className="border-2 border-black bg-[#F4EFE6] p-5 relative rounded-none shadow-sm border-l-[#E4572E] border-l-4">
          <div className="absolute -top-2.5 left-4 bg-[#F4EFE6] px-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-black/50">
            Plate 02
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/60">New Inquiries</div>
          <div className="font-serif text-4xl mt-2 font-bold text-[#E4572E]">{newLeads}</div>
        </div>

        <div className="border-2 border-black bg-[#F4EFE6] p-5 relative rounded-none shadow-sm border-l-orange-500 border-l-4">
          <div className="absolute -top-2.5 left-4 bg-[#F4EFE6] px-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-black/50">
            Plate 03
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/60">Contacted</div>
          <div className="font-serif text-4xl mt-2 font-bold">{contactedLeads}</div>
        </div>

        <div className="border-2 border-black bg-[#F4EFE6] p-5 relative rounded-none shadow-sm border-l-black border-l-4">
          <div className="absolute -top-2.5 left-4 bg-[#F4EFE6] px-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-black/50">
            Plate 04
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/60">Closed / Won</div>
          <div className="font-serif text-4xl mt-2 font-bold text-black/40">{closedLeads}</div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-none bg-transparent border-2 border-black self-start">
          {(['All', 'New', 'Contacted', 'Closed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
                activeTab === tab
                  ? 'bg-black text-[#F4EFE6]'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name or email..."
            className="brutal-input py-2 text-xs pl-8 border-b-2 border-black"
          />
          <span className="absolute left-2 top-2 text-black/40 text-xs">🔍</span>
        </div>
      </div>

      {/* Leads Data Table */}
      <div className="border-2 border-black bg-[#F4EFE6] rounded-none overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black border-b-2 border-black font-mono text-[#F4EFE6] text-[10px] uppercase tracking-[0.2em] font-semibold">
              <tr>
                <th className="p-4">01 Contact</th>
                <th className="p-4">02 Budget</th>
                <th className="hidden sm:table-cell p-4">03 Message</th>
                <th className="p-4">04 Status</th>
                <th className="hidden md:table-cell p-4">05 Date</th>
              </tr>
            </thead>

            <tbody className="divide-y border-black divide-black/10">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-black/40 font-mono text-sm">
                    {searchTerm ? `No records matching "${searchTerm}"` : 'No lead records found.'}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-black/[0.03] transition-colors">
                    {/* Contact Info */}
                    <td className="p-4 space-y-0.5">
                      <div className="font-serif font-bold text-black text-lg">{lead.name}</div>
                      <div className="font-mono text-black/50 text-[10px] tracking-wide">{lead.email}</div>
                    </td>

                    {/* Budget Range */}
                    <td className="p-4">
                      <span className="font-mono text-xs border border-black/35 px-2 py-0.5 bg-black/[0.02] whitespace-nowrap">
                        {lead.budget_range}
                      </span>
                    </td>

                    {/* Message snippet */}
                    <td className="hidden sm:table-cell p-4 max-w-xs text-black/80 font-normal leading-relaxed text-sm whitespace-normal break-words">
                      {lead.message || <span className="text-black/30 italic">No description provided</span>}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as 'New' | 'Contacted' | 'Closed')
                        }
                        className={`font-mono text-xs font-semibold px-3 py-1.5 bg-transparent border-2 border-black rounded-none cursor-pointer focus:outline-none transition-all ${
                          lead.status === 'New'
                            ? 'border-[#E4572E] text-[#E4572E]'
                            : lead.status === 'Contacted'
                            ? 'border-orange-500 text-orange-500'
                            : 'border-black/30 text-black/40'
                        }`}
                      >
                        <option value="New" className="bg-[#F4EFE6] text-[#E4572E]">● New</option>
                        <option value="Contacted" className="bg-[#F4EFE6] text-orange-500">● Contacted</option>
                        <option value="Closed" className="bg-[#F4EFE6] text-black/40">● Closed</option>
                      </select>
                    </td>

                    {/* Submission Date */}
                    <td className="hidden md:table-cell p-4 font-mono text-black/50 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
