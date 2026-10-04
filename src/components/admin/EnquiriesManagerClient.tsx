'use client';

import { useState } from 'react';
import { updateEnquiryStatusAction } from '@/server/actions/admin';
import { Search, Mail, Phone, MapPin, Check, Archive, Clock, Inbox } from 'lucide-react';

interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  userType: string;
  ageOrClass?: string | null;
  preferredLocation?: string | null;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'ARCHIVED';
  createdAt: Date;
}

export default function EnquiriesManagerClient({
  initialEnquiries,
}: {
  initialEnquiries: any[];
}) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  const handleStatusChange = async (id: string, newStatus: 'NEW' | 'CONTACTED' | 'ARCHIVED') => {
    const res = await updateEnquiryStatusAction(id, newStatus);
    if (res.success) {
      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(term) ||
      e.phone.toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term) ||
      (e.preferredLocation && e.preferredLocation.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, or center..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE000]"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 self-start sm:self-auto">
          {['ALL', 'NEW', 'CONTACTED', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                statusFilter === st
                  ? 'bg-[#FFE000] text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: List + Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries List */}
        <div className="lg:col-span-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0C0C0C] border border-white/10 text-center text-zinc-500 text-xs">
              <Inbox className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
              <span>No enquiries matching current filters.</span>
            </div>
          ) : (
            filtered.map((enq) => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnquiry(enq)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedEnquiry?.id === enq.id
                    ? 'bg-zinc-800/80 border-[#FFE000]'
                    : 'bg-[#0C0C0C] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white uppercase">{enq.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                      enq.status === 'NEW'
                        ? 'bg-[#FFE000] text-black font-extrabold'
                        : enq.status === 'CONTACTED'
                        ? 'bg-blue-950 text-blue-300'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <div className="text-xs text-zinc-400 space-y-1 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FFE000]" />
                    <span>{enq.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{enq.email}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 italic bg-white/5 p-2 rounded-lg">
                  &ldquo;{enq.message}&rdquo;
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Type: {enq.userType}</span>
                  <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Detail View */}
        <div className="lg:col-span-6">
          {selectedEnquiry ? (
            <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl sticky top-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#FFE000] uppercase font-bold block mb-1">
                    LEAD DETAIL
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase">{selectedEnquiry.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {selectedEnquiry.status !== 'CONTACTED' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'CONTACTED')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-semibold uppercase"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Contacted</span>
                    </button>
                  )}

                  {selectedEnquiry.status !== 'ARCHIVED' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'ARCHIVED')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      <span>Archive</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">Phone:</span>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-sm font-bold text-[#FFE000] hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block mb-1">Email:</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-sm font-bold text-white hover:underline truncate block"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">Inquirer Role:</span>
                    <span className="font-semibold text-white">{selectedEnquiry.userType}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-zinc-500 uppercase block mb-1">Age / Class:</span>
                    <span className="font-semibold text-white">
                      {selectedEnquiry.ageOrClass || 'Not Specified'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                  <span className="text-zinc-500 uppercase block mb-1">Preferred Location:</span>
                  <span className="font-semibold text-white">
                    {selectedEnquiry.preferredLocation || 'Any / All Centers'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
                  <span className="text-zinc-500 uppercase block mb-2 font-bold">Inquiry Message:</span>
                  <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">
                    {selectedEnquiry.message}
                  </p>
                </div>

                <p className="text-[11px] text-zinc-500 font-mono text-right">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-[#0C0C0C] border border-white/10 text-center text-zinc-500 text-xs">
              Select an enquiry from the list to view full communication notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
