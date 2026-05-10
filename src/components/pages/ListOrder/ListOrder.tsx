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
import { motion } from "motion/react";

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
          <div className="overflow-x-auto">
            <table className="w-full">
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
                  data?.data.map((e, index: number) => {
                    const rowNumber = (page - 1) * pageSize + (index + 1);
                    return (
                      <tr
                        key={e.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">{rowNumber}</td>
                        <td className="px-6 py-4 ">{e.customer_name}</td>
                        <td className="px-6 py-4 ">{e.table_number}</td>
                        <td className="px-6 py-4 ">{e.total}</td>
                        <td className="px-6 py-4 ">
                          <motion.div
                            onClick={() => {
                              Swal.fire({
                                title: "Change Status",
                                input: "select",
                                inputOptions: {
                                  processing: "Processing",
                                  completed: "Completed",
                                },
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  const newStatus = result.value.toUpperCase();

                                  if (newStatus != "") {
                                    await updateOrderStatus(e.id, newStatus);
                                    Swal.fire(
                                      "Updated!",
                                      `Order status has been updated to ${newStatus}.`,
                                      "success",
                                    );
                                    refetch();
                                  }
                                  console.log(newStatus);
                                }
                              });
                            }}
                            className={` cursor-pointer text-xs  ${e.status == "COMPLETED" ? "bg-emerald-500" : e.status == "PROCESSING" ? "bg-yellow-500" : ""} font-bold text-white  text-center px-1 py-1 rounded-full`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {e.status}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4 ">
                          <div className="flex items-center gap-2">
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
                              className="
                            bg-transparent text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors
                            text-blue-600 hover:text-blue-900"
                            >
                              <Eye />
                            </button>
                            <button
                              onClick={() => {
                                deleteOrder(e.id);
                              }}
                              className="bg-transparent text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1 rounded-md transition-colors
                             hover:text-red-900"
                            >
                              <TrashIcon></TrashIcon>
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
