
import { orders } from "./data.js";

const ORIGINAL = JSON.stringify(orders);

// Station 1 — Question 1


// Get all order IDs

const orderIds = orders.map(({ id }) => id);
console.log("Station 1 — Question 1:", orderIds);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);

// Station 1 — Question 2: Get all customer names



const customerNames = orders.map(({ customer }) => customer.name);
console.log("Station 1 — Question 2:", customerNames);

// Station 1 — Question 3: Get all delivered orders


const deliveredOrders = orders.filter(
  ({ status }) => status === "delivered"
);
console.log("Station 1 — Question 3:", deliveredOrders);

// Station 1 — Question 4: Get all orders from Gasabo


const gasaboOrders = orders.filter(
  ({ customer }) => customer.district === "Gasabo"
);
console.log("Station 1 — Question 4:", gasaboOrders);



// Station 1 — Question 5: Find order with ID 106



const order106 = orders.find(({ id }) => id === 106);
console.log("Station 1 — Question 5:", order106);




// Station 1 — Question 6: Check for a rating of 3 or less



const hasLowRating = orders.some(
  ({ rating }) => rating !== null && rating <= 3
);
console.log("Station 1 — Question 6:", hasLowRating);



// Station 1 — Question 7: Check pending orders are unrated


const pendingOrdersUnrated = orders
  .filter(({ status }) => status === "pending")
  .every(({ rating }) => rating === null);
console.log("Station 1 — Question 7:", pendingOrdersUnrated);



// Station 1 — Question 8: Get unique customer names

const uniqueNames = [
  ...new Set(orders.map(({ customer }) => customer.name))
];
console.log("Station 1 — Question 8:", uniqueNames);




// ==========================================
// STATION 2 — Calculations with reduce
// Questions 9–14
// ==========================================

// Question 9: Calculate order totals without changing original data

const orderTotal = ({ items }) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: orderTotal(order)
}));

console.log("Question 9:", ordersWithTotals);

// Question 10: Calculate revenue from delivered orders

const deliveredRevenue = ordersWithTotals
  .filter(({ status }) => status === "delivered")
  .reduce((sum, order) => sum + order.total, 0);

console.log("Question 10: Delivered revenue =", deliveredRevenue, "RWF");

// Question 11: Calculate average rating, rounded to 1 decimal

const ratedOrders = orders.filter(({ rating }) => rating !== null);

const averageRating = Number(
  (
    ratedOrders.reduce((sum, { rating }) => sum + rating, 0) /
    ratedOrders.length
  ).toFixed(1)
);

console.log("Question 11: Average rating =", averageRating);

// Question 12: Calculate total Brochette quantity using flatMap

const brochetteQty = orders
  .flatMap(({ items }) => items)
  .filter(({ name }) => name === "Brochette")
  .reduce((sum, item) => sum + item.qty, 0);

console.log("Question 12: Brochette quantity =", brochetteQty);

// Question 13: Find the most expensive order

const mostExpensiveOrder = ordersWithTotals.reduce((highest, order) =>
  order.total > highest.total ? order : highest
);

console.log("Question 13: Most expensive order =", {
  id: mostExpensiveOrder.id,
  customer: mostExpensiveOrder.customer.name,
  total: mostExpensiveOrder.total
});

// Question 14: Count orders by status

const statusCounts = orders.reduce((counts, { status }) => {
  counts[status] = (counts[status] || 0) + 1;
  return counts;
}, {});

console.log("Question 14: Orders by status =", statusCounts);



 // Station 3 — Question 15
const revenueByDistrict = orders
  .filter(order => order.status === "delivered")
  .reduce((totals, order) => {
    const district = order.customer.district;
    const revenue = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    totals[district] = (totals[district] || 0) + revenue;
    return totals;
  }, {});

console.log("Question 15:", revenueByDistrict);





 // Station 3 — Question 16


const ordersByDate = Object.groupBy(orders, order => order.date);

const dailySummary = Object.entries(ordersByDate).map(([date, dayOrders]) => {
  const revenue = dayOrders.reduce((sum, order) => {
    return sum + order.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  }, 0);

  return {
    date,
    count: dayOrders.length,
    revenue
  };
});

console.log("Question 16:", dailySummary);




 // Station 3 — Question 17


const itemTotals = orders
  .flatMap(order => order.items)
  .reduce((totals, item) => {
    totals[item.name] = (totals[item.name] || 0) + item.qty;
    return totals;
  }, {});

const topThreeItems = Object.entries(itemTotals)
  .map(([name, qty]) => ({ name, qty }))
  .toSorted((a, b) => b.qty - a.qty)
  .slice(0, 3);

console.log("Question 17:", topThreeItems);




 // Station 3 — Question 18
const customerSummary = Object.values(
  orders.reduce((customers, order) => {
    const name = order.customer.name;

    if (!customers[name]) {
      customers[name] = {
        name,
        orders: 0,
        spent: 0
      };
    }

    customers[name].orders += 1;

    customers[name].spent += order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return customers;
  }, {})
)
  .toSorted((a, b) => b.spent - a.spent);

console.log("Question 18:", customerSummary);



 // Station 3 — Question 19
const menuPrices = Object.fromEntries(
  orders.flatMap(order =>
    order.items.map(item => [item.name, item.price])
  )
);

console.log("Question 19:", menuPrices);





 // Station 4 — Question 20



function markDelivered(orders, id) {
  return orders.map(order =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );
}

const updatedOrders = markDelivered(orders, 105);

console.log(
  "Question 20:",
  updatedOrders.find(order => order.id === 105)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



 // Station 4 — Question 21


function rateOrder(orders, id, rating) {
  return orders.map(order =>
    order.id === id && order.status === "delivered"
      ? { ...order, rating }
      : order
  );
}

const ratedOrdersTest = rateOrder(orders, 101, 4);

console.log(
  "Question 21:",
  ratedOrdersTest.find(order => order.id === 101)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



// Station 4 — Question 22

function changeDistrict(orders, id, district) {
  return orders.map(order =>
    order.id === id
      ? {
          ...order,
          customer: {
            ...order.customer,
            district
          }
        }
      : order
  );
}

const districtTest = changeDistrict(orders, 101, "Kicukiro");

console.log(
  "Question 22:",
  districtTest.find(order => order.id === 101)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



// Station 4 — Question 23

function addItem(orders, id, item) {
  return orders.map(order =>
    order.id === id
      ? {
          ...order,
          items: [...order.items, item]
        }
      : order
  );
}

const addItemTest = addItem(orders, 101, {
  name: "Juice",
  price: 1500,
  qty: 1
});

console.log(
  "Question 23:",
  addItemTest.find(order => order.id === 101).items
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);


// Station 4 — Question 24

function removeCancelled(orders) {
  return orders.filter(order => order.status !== "cancelled");
}

const activeOrders = removeCancelled(orders);

console.log(
  "Question 24 — Remaining orders:",
  activeOrders.length
);

console.log(
  "Question 24 — Cancelled orders remain:",
  activeOrders.some(order => order.status === "cancelled")
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);




// Station 4 — Question 25

function applyDiscount(orders, percent) {
  return orders.map(order => ({
    ...order,
    items: order.items.map(item => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100))
    }))
  }));
}

const discountedOrders = applyDiscount(orders, 10);

console.log(
  "Question 25 — Discounted order:",
  discountedOrders.find(order => order.id === 101)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);