
import { orders } from "../data.js";

function getOrderTotal(order) {
  return order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
}

// Only delivered orders count toward sales revenue.
const delivered = orders.filter(order => order.status === "delivered");
const revenue = delivered.reduce(
  (sum, order) => sum + getOrderTotal(order),
  0
);
const totalItemsSold = delivered.reduce(
  (sum, order) => sum + order.items.reduce(
    (itemSum, item) => itemSum + item.qty,
    0
  ),
  0
);

// Statistic cards with circular icons
const stats = [
  {
    title: "Total Orders",
    value: orders.length,
    icon: "▤",
    color: "bg-blue-100 text-blue-700",
    note: "All recorded orders"
  },
  {
    title: "Sales Volume",
    value: `${revenue.toLocaleString()} RWF`,
    icon: "↗",
    color: "bg-emerald-100 text-emerald-700",
    note: `${totalItemsSold} items in delivered orders`
  },
  {
    title: "Expenses",
    value: "Not available",
    icon: "↘",
    color: "bg-amber-100 text-amber-700",
    note: "No expense data provided"
  },
  {
    title: "Pending Orders",
    value: orders.filter(order => order.status === "pending").length,
    icon: "◷",
    color: "bg-violet-100 text-violet-700",
    note: "Awaiting completion"
  }
];

document.querySelector("#stats").innerHTML = stats.map(stat => `
  <article class="bg-white rounded-2xl p-5 shadow-sm">
    <div class="flex items-center justify-between mb-5">
      <p class="text-slate-500 text-sm">${stat.title}</p>
      <span class="w-11 h-11 rounded-full ${stat.color}
        flex items-center justify-center text-xl font-bold">
        ${stat.icon}
      </span>
    </div>
    <p class="text-2xl font-bold break-words">${stat.value}</p>
    <p class="text-xs text-slate-500 mt-3">${stat.note}</p>
  </article>
`).join("");

// Revenue by district
const districtRevenue = {};

delivered.forEach(order => {
  const district = order.customer.district;
  districtRevenue[district] =
    (districtRevenue[district] || 0) + getOrderTotal(order);
});

const districtEntries = Object.entries(districtRevenue);
const maxRevenue = Math.max(
  ...districtEntries.map(([, amount]) => amount),
  1
);

document.querySelector("#district-revenue").innerHTML = districtEntries
  .map(([district, amount]) => `
    <div>
      <div class="flex justify-between gap-3 text-sm mb-2">
        <span class="font-medium">${district}</span>
        <span class="font-semibold">${amount.toLocaleString()} RWF</span>
      </div>
      <div class="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div class="h-3 bg-blue-600 rounded-full"
          style="width:${amount / maxRevenue * 100}%"></div>
      </div>
    </div>
  `).join("");

// Order status overview
const statuses = [
  { name: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "bg-emerald-500" },
  { name: "Pending", value: orders.filter(o => o.status === "pending").length, color: "bg-amber-500" },
  { name: "Cancelled", value: orders.filter(o => o.status === "cancelled").length, color: "bg-rose-500" }
];

document.querySelector("#order-overview").innerHTML = statuses.map(status => `
  <div class="flex items-center justify-between border-b border-slate-100 pb-4">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full ${status.color}"></span>
      <span>${status.name}</span>
    </div>
    <span class="font-bold">${status.value}</span>
  </div>
`).join("");

// Search and status filters for recent orders
function renderOrders() {
  const search = document.querySelector("#search").value.toLowerCase();
  const selectedStatus = document.querySelector("#status-filter").value;

  const filteredOrders = orders.filter(order => {
    const matchesName = order.customer.name.toLowerCase().includes(search);
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    return matchesName && matchesStatus;
  });

  document.querySelector("#orders-table").innerHTML = filteredOrders
    .map(order => `
      <tr class="border-b border-slate-100 hover:bg-slate-50">
        <td class="p-3 font-semibold">#${order.id}</td>
        <td class="p-3">${order.customer.name}</td>
        <td class="p-3">${order.customer.district}</td>
        <td class="p-3">
          <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold
            ${order.status === "delivered"
              ? "bg-emerald-100 text-emerald-700"
              : order.status === "pending"
                ? "bg-amber-100 text-amber-700"
                : "bg-rose-100 text-rose-700"}">
            ${order.status}
          </span>
        </td>
        <td class="p-3 font-medium">${getOrderTotal(order).toLocaleString()}</td>
      </tr>
    `)
    .join("");

  document.querySelector("#empty-message").classList.toggle(
    "hidden",
    filteredOrders.length !== 0
  );
}

document.querySelector("#search").addEventListener("input", renderOrders);
document.querySelector("#status-filter").addEventListener("change", renderOrders);

renderOrders();
