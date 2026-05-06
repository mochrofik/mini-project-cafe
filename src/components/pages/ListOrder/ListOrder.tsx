import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOrders } from "../../../services/order.service";
import Header from "../../layouts/Header";
import SearchUI from "../../ui/Search.tsx";
import SelectUI from "../../ui/Select/Select.tsx";
import CardUI from "../../ui/Card/Card.tsx";
import type { IOrder } from "../../../types/order.ts";

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const filterStatus = ["ALL", "PENDING", "PROCESSING", "COMPLETED"];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dataOrder", page, pageSize, searchTerm, selectedStatus],
    queryFn: async () =>
      await getOrders({
        page: page,
        pageSize: pageSize,
        search: searchTerm,
        status: selectedStatus,
      }),
  });

  console.log(data);

  return (
    <main className="h-screen bg-slate-50">
      <Header />
      <div className="flex flex-col p-6 md:p-10 lg:p-20 gap-5">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="mb-6">
            <div>
              <h1 className="font-bold"> Order List</h1>
              <p className="text-slate-500 text-sm">Manage order list</p>
            </div>
          </div>

          <div className="flex flex-row gap-4 mb-6">
            <div className="w-full">
              <SearchUI
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <SelectUI
                id="status"
                name="status"
                onChange={(e) => setSelectedStatus(e.target.value)}
                value={selectedStatus}
              >
                {filterStatus.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  );
                })}
              </SelectUI>
            </div>
          </div>
        </div>

        <CardUI id="table">
          <table className="w-full table-auto">
            <thead className="border-b">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm font-semibold">No</th>
                <th className="px-6 py-4 text-sm font-semibold">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold">
                  Table Number
                </th>
                <th className="px-6 py-4 text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    Memuat data
                  </td>
                </tr>
              ) : (
                data.data.map((e: IOrder, index: number) => {
                  const rowNumber = (page - 1) * pageSize + (index + 1);
                  return (
                    <tr
                      key={e.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">{rowNumber}</td>
                      <td className="px-6 py-4 ">{e.customer_name}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardUI>
      </div>
    </main>
  );
};

export default ListOrder;
