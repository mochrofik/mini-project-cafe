import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react"; // Menggunakan lucide-react untuk ikon
import { getOrderById } from "../../../services/order.service";
import type { IOrderDetailResponse } from "../../../types/order";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const OrderDetailModal = ({ isOpen, onClose, id }: OrderDetailModalProps) => {
  if (!isOpen) return null;

  const { data, isLoading } = useQuery<IOrderDetailResponse>({
    queryKey: ["orderDetail", id],
    queryFn: async () => await getOrderById(id),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden p-6">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Info Utama */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500">Order Number:</p>
              <p className="font-semibold text-emerald-600">{data?.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {data?.created_at.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-gray-500">Customer Name:</p>
              <p className="font-medium text-gray-800">{data?.customer_name}</p>
            </div>
            <span
              className={
                data?.status === "PROCESSING"
                  ? "px-3 py-1  bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full"
                  : data?.status === "COMPLETED"
                    ? "px-3 py-1  bg-green-100 text-green-700 text-xs font-bold rounded-full"
                    : ""
              }
            >
              {data?.status}
            </span>
          </div>

          <hr className="mb-6" />

          {/* List Menu */}
          <div className="space-y-6 mb-8">
            {data?.cart.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.menuItem.image_url}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {item.menuItem.name}
                    </h3>
                    <p className="text-gray-800 font-medium">
                      ${item.menuItem.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {item.menuItem.description}
                  </p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Rincian Harga */}
          <div className="space-y-2 pt-4 text-sm text-gray-600">
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t mt-2">
              <span>Total </span>
              <span className="text-emerald-600">${data?.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-shadow shadow-md shadow-emerald-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
