import httpHeader from "../../../services/httpHeader";
import { useState } from "react";
import { FiArrowUpRight, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";

const TableRow = ({
  id,
  question,
  type,
  order,
}: {
  id: string;
  type: string;
  question: string;
  order: number;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteQuestion = async () => {
    await httpHeader.delete("/admin/delete-question", {
      data: {
        id
      }
    })
  };

  return (
    <>
      <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
        <td className="p-1.5">
          <a href="#" className="text-green-600 underline flex items-center gap-1">
            {id} <FiArrowUpRight />
          </a>
        </td>
        <td className="p-1.5">{question}</td>
        <td className="p-1.5">{type}</td>
        <td className="relative w-8">
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FiMoreHorizontal />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 z-10 bg-white border border-stone-300 rounded shadow-md p-2 text-xs">
              <button
                onClick={handleDeleteQuestion}
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
