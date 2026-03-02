import { OrderStatusType } from "@/src/types";

export default function OrderStatusCard({
  filterData,
}: {
  filterData: OrderStatusType;
}) {
  return (
    <div className="flex-col space-y-3 justify-between items-center shadow-sm border rounded-2xl p-3 my-3">
      <div>
        <p className="text-xl text-green-400 font-bold">
          Total Orders : <small>{filterData.totalOrder}</small>
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {/* pending */}
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {filterData.pending}
          </div>
          <div className="text-xs text-slate-600">Pending</div>
        </div>
        {/* deliverd */}
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {filterData.delivered}
          </div>
          <div className="text-xs text-slate-600">Pending</div>
        </div>
        {/* canceled*/}
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {filterData.canceled}
          </div>
          <div className="text-xs text-slate-600">Pending</div>
        </div>
        {/* preparing */}
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {filterData.preparing}
          </div>
          <div className="text-xs text-slate-600">Pending</div>
        </div>
        {/* ready*/}
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 text-center">
          <div className="text-lg font-semibold text-slate-900">
            {filterData.ready}
          </div>
          <div className="text-xs text-slate-600">Pending</div>
        </div>
      </div>
    </div>
  );
}
