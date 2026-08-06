import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminInquiries, markInquiryRead } from "../../lib/api";

export function AdminInquiriesPage() {
  const queryClient = useQueryClient();
  const [markingId, setMarkingId] = useState<string | null>(null);

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: getAdminInquiries,
    refetchOnWindowFocus: true,
  });

  const handleMarkRead = async (id: string) => {
    setMarkingId(id);
    try {
      await markInquiryRead(id);
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    } catch (err: any) {
      alert("Failed: " + err.message);
    } finally {
      setMarkingId(null);
    }
  };

  const newCount = inquiries.filter((i: any) => i.status === "new").length;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-hive-ink">Leads & Inquiries</h1>
            {newCount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                {newCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 mt-1">Customer messages from property pages.</p>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4 min-w-[300px]">Message</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-neutral-100 rounded-full animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-neutral-400 font-medium">
                    No inquiries yet. They'll appear here when customers submit forms.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq: any) => (
                  <tr
                    key={inq.id}
                    className={`transition-colors ${inq.status === "new" ? "bg-blue-50/60 hover:bg-blue-50" : "hover:bg-neutral-50"}`}
                  >
                    <td className="px-6 py-4">
                      {inq.status === "new" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                          NEW
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 border border-neutral-200">
                          READ
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-400 font-medium">
                      {new Date(inq.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-hive-ink">{inq.name}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{inq.phone}</div>
                      {inq.email && <div className="text-xs text-neutral-400">{inq.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-xs text-hive-ink font-semibold whitespace-normal max-w-[200px]">
                      {inq.property?.title || <span className="text-neutral-400">Unknown</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-normal max-w-[300px] text-neutral-500 text-xs leading-relaxed">
                      {inq.message}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inq.status === "new" && (
                        <button
                          onClick={() => handleMarkRead(inq.id)}
                          disabled={markingId === inq.id}
                          className="text-xs font-bold text-hive-ink hover:underline disabled:opacity-40"
                        >
                          {markingId === inq.id ? "Marking..." : "Mark Read"}
                        </button>
                      )}
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
