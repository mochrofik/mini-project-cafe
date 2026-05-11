import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  deleteOrderById,
  getOrders,
  updateOrderStatus,
} from "../../../services/order.service";
import Header from "../../layouts/Header";
import SearchUI from "../../ui/Search.tsx";
import SelectUI from "../../ui/Select/Select.tsx";
import CardUI from "../../ui/Card/Card.tsx";
import type { IOrderResponse } from "../../../types/order.ts";
import { Eye, TrashIcon } from "lucide-react";
import OrderDetailModal from "./OrderDetail.tsx";
import Swal from "sweetalert2";
import ChangeStatus from "./BadgeStatus.tsx";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const filterStatus = ["ALL", "PROCESSING", "COMPLETED"];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [idModal, setIdModal] = useState<string>("");

  const { data, isLoading, refetch } = useQuery<IOrderResponse>({
    queryKey: ["dataOrder", page, pageSize, searchTerm, selectedStatus],
    queryFn: async () =>
      await getOrders({
        page: page,
        pageSize: pageSize,
        search: searchTerm,
        status: selectedStatus,
      }),
  });

  const deleteOrder = (id: string) => {
    Swal.fire({
      title: "<i>Confirm</i>",
      text: "Are you sure want delete ?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteOrderById(id);
        if (
          response.message != null &&
          response.message === "Order deleted successfully"
        ) {
          Swal.fire(
            "Deleted!",
            `Your order ${id} has been deleted.`,
            "success",
          );
        } else {
          Swal.fire("Failed!", `Failed to delete order ${id}.`, "error");
        }

        refetch();
      }
    });
  };

  const changeStatus = async (id: string) => {
    Swal.fire({
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-emerald-500 shadow-lg cursor-pointer rounded-lg hover:bg-emerald-600 text-white font-bold py-2.5 px-6 transition-all",
      },
      confirmButtonText: "Update Status",
      showConfirmButton: true,
      title: "Change Order Status",
      input: "select",
      inputOptions: {
        processing: "Processing",
        completed: "Completed",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newStatus = result.value.toUpperCase();
        if (newStatus !== "") {
          await updateOrderStatus(id, newStatus);
          Swal.fire("Success!", `Status updated to ${newStatus}`, "success");
          refetch();
        }
      }
    });
  };

  return (
    <main className="h-screen bg-slate-50">
      <Header />
      <div className="flex flex-col p-6 md:p-10 lg:p-20 gap-5">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex flex-row justify-between">
            <div className="mb-6">
              <div>
                <h1 className="font-bold"> Order List</h1>
                <p className="text-slate-500 text-sm">Manage order list</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={"/create-order"}>
                <div className="bg-emerald-500 transition shadow-lg shadow-emerald-100 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full">
                  Create Order
                </div>
              </Link>
            </motion.button>
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header - Disembunyikan di mobile agar tidak berantakan */}
              <thead className="hidden md:table-header-group bg-slate-50/50 border-b border-slate-200">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-20 text-center text-slate-400 font-medium"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        Memuat data...
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.data.map((e, index) => {
                    const rowNumber = (page - 1) * pageSize + (index + 1);
                    return (
                      <tr
                        key={e.id}
                        className="group flex flex-col md:table-row hover:bg-slate-50/80 transition-all duration-200"
                      >
                        {/* No - Sembunyikan di mobile jika dirasa terlalu ramai */}
                        <td className="px-6 py-4 md:table-cell hidden text-sm text-slate-600 font-medium">
                          {rowNumber}
                        </td>

                        {/* Customer Name */}
                        <td className="px-6 pt-4 pb-1 md:py-4 md:table-cell flex justify-between items-center">
                          <span className="md:hidden text-[10px] font-bold uppercase text-slate-400">
                            Customer
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {e.customer_name}
                          </span>
                        </td>

                        {/* Table Number */}
                        <td className="px-6 py-1 md:py-4 md:table-cell flex justify-between items-center">
                          <span className="md:hidden text-[10px] font-bold uppercase text-slate-400">
                            Table
                          </span>
                          <span className="text-sm text-slate-600 font-medium bg-slate-100 px-2.5 py-0.5 rounded-md md:bg-transparent md:p-0">
                            #{e.table_number}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-1 md:py-4 md:table-cell flex justify-between items-center">
                          <span className="md:hidden text-[10px] font-bold uppercase text-slate-400">
                            Total
                          </span>
                          <span className="text-sm font-bold text-emerald-600">
                            {e.total}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-2 md:py-4 md:table-cell text-center  flex justify-center items-center">
                          <ChangeStatus
                            status={e.status}
                            onclick={() => changeStatus(e.id)}
                            key={e.id}
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-6 pt-2 pb-5 md:py-4 md:table-cell">
                          <div className="flex items-center justify-center gap-3">
                            {idModal === e.id && (
                              <OrderDetailModal
                                isOpen={isModalOpen}
                                onClose={() => {
                                  setIsModalOpen(false);
                                  setIdModal("");
                                }}
                                id={idModal}
                              />
                            )}

                            <button
                              onClick={() => {
                                setIsModalOpen(true);
                                setIdModal(e.id);
                              }}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group/btn"
                              title="View Detail"
                            >
                              <Eye
                                size={18}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                            </button>

                            <button
                              onClick={() => deleteOrder(e.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group/btn"
                              title="Delete Order"
                            >
                              <TrashIcon
                                size={18}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {Math.ceil(data?.metadata?.total! / pageSize)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(data?.metadata.total! / pageSize)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition"
              >
                Next
              </button>
            </div>
          </div>
        </CardUI>
      </div>
    </main>
  );
};

export default ListOrder;
