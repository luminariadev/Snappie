import { useEffect, useState } from "react";
import TransactionList from "../../components/admin/TransactionList";
import { MdSearch, MdFilterAlt, MdDateRange } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import TotalRevenueCard from "../../components/admin/transactions/TotalRevenueCard";
import TotalSuccessTransactionCard from "../../components/admin/transactions/TotalSuccessTransactionCard";
import TotalVisitorsCard from "../../components/admin/transactions/TotalVisitorsCard";

import DatePicker from "react-datepicker";

const API_URL = "http://localhost:5000/api/admin/transactions";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => { setTransactions(data); setLoading(false); })
      .catch((err) => { console.error("Fetch error:", err); setLoading(false); });
  }, []);

  const stats = {
    revenue: transactions.reduce((sum, t) => sum + Number(t.harga || 0), 0),
    success: transactions.filter((t) => t.status === "Premium").length,
    visitors: transactions.length,
  };

  const filteredData = transactions.filter((item) => {
    const matchSearch = item.frame?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = selectedDate
      ? new Date(item.date).toDateString() === selectedDate.toDateString() : true;
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    return matchSearch && matchDate && matchStatus;
  });

  return (
    <div className="w-full min-h-[calc(100vh-76px)] py-6 lg:py-8 px-4 lg:px-10">
      <div className="max-w-[1500px] mx-auto">
        <h1 className="font-pixel text-[24px] lg:text-[28px] mb-6 lg:mb-8">Transaksi</h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mt-6 mb-8">
          <TotalRevenueCard value={stats.revenue} />
          <TotalSuccessTransactionCard value={stats.success} />
          <TotalVisitorsCard value={stats.visitors} />
        </div>

        <div className="w-full flex flex-wrap items-center gap-4 bg-snappiePink border-[2px] border-black rounded-[25px] px-4 lg:px-6 py-4 mb-8 shadow-md">
          <div className="relative flex-1 min-w-[200px]">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[45px] border-[2px] border-black rounded-[12px] pl-10 pr-4 bg-white font-pixel text-[11px]" />
          </div>

          <div className="relative">
            <button onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 w-[110px] h-[45px] bg-white border-[2px] border-black rounded-[12px] font-pixel text-[11px] justify-center">
              <MdDateRange /> Date <IoIosArrowDown />
            </button>
            {showDatePicker && (
              <div className="absolute top-[50px] z-[100] bg-white p-2 border-[2px] border-black rounded-[12px]">
                <DatePicker selected={selectedDate}
                  onChange={(date) => { setSelectedDate(date); setShowDatePicker(false); }} inline />
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 w-[110px] h-[45px] bg-white border-[2px] border-black rounded-[12px] font-pixel text-[11px] justify-center">
              <MdFilterAlt /> Status <IoIosArrowDown />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-[52px] w-[120px] bg-white border-[2px] border-black rounded-[12px] z-[100]">
                {["Premium", "Gratis"].map((s) => (
                  <button key={s} onClick={() => { setFilterStatus(s); setShowStatusDropdown(false); }}
                    className="w-full px-4 py-2 font-pixel text-[11px] hover:bg-gray-100 border-b border-black/10 last:border-0">{s}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? <p className="text-center font-pixel">Loading transaksi...</p> : <TransactionList data={filteredData} />}
      </div>
    </div>
  );
}
