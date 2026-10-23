javascript
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