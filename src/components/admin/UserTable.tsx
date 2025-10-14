import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Pagination from "../product/Pagination";

interface UserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  created: string;
  avatar?: string;
}

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);

  const users: UserProps[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: "Robert Fox",
    email: "robert@gmail.com",
    phone: "(201) 555-0124",
    created: "6 October, 2025",
    avatar: "https://via.placeholder.com/40/38bdf8/ffffff?text=R",
  }));

  const ITEMS_PER_PAGE = 10;
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex rounded-full w-96 border bg-white shadow-md mb-6">
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            if (!value.startsWith(" ")) setSearch(value);
          }}
          className="flex-1 px-6 py-2 text-sm sm:text-base bg-transparent text-[#333] placeholder-gray-500 focus:outline-none"
          placeholder="Search..."
        />
        <button className="w-12 sm:w-14 text-lg sm:text-xl border-l-1 rounded-r-full bg-gray-100 hover:bg-gray-50 text-gray-900 hover:text-gray-700 flex items-center justify-center transition cursor-pointer">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-base font-semibold text-gray-600">
                NAME
              </th>
              <th className="px-6 py-3 text-base font-semibold text-gray-600">
                PHONE
              </th>
              <th className="px-6 py-3 text-base font-semibold text-gray-600">
                CREATED
              </th>
              <th className="px-6 py-3 text-base font-semibold text-gray-600">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full bg-sky-400"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.created}</td>
                <td className="px-6 py-4 flex items-center gap-3 text-gray-500">
                  <button className="hover:text-blue-600">
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>

                  <button className="hover:text-red-600">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Showing{" "}
          <select
            className="border rounded px-1 py-0.5"
            value={ITEMS_PER_PAGE}
            onChange={() => {}}
          >
            <option>10</option>
          </select>{" "}
          of {filtered.length}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
