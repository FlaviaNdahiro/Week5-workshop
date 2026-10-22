
import { orders } from "./data.js";

const ORIGINAL = JSON.stringify(orders);


// Station 1 — Question 1: Get all order IDs

const orderIds = orders.map(({ id }) => id);
console.log("Question 1:", orderIds);

// Check that the original data has not changed
console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



// Station 1 — Question 2: Get all customer names


const customerNames = orders.map(({ customer }) => customer.name);
console.log("Question 2:", customerNames);



// Station 1 — Question 3: Get all delivered orders
const deliveredOrders = orders.filter(
  ({ status }) => status === "delivered"
);
console.log("Question 3:");
console.log(JSON.stringify(deliveredOrders, null, 2));

// Station 1 — Question 4: Get all orders from Gasabo
const gasaboOrders = orders.filter(
  ({ customer }) => customer.district === "Gasabo"
);

console.log("Question 4:", gasaboOrders);

// Station 1 — Question 5: Find order with ID 106
const order106 = orders.find(({ id }) => id === 106);

console.log("Question 5:", order106);


// Station 1 — Question 6: Check if any order has a rating of 3 or less
const hasLowRating = orders.some(
  ({ rating }) => rating !== null && rating <= 3
);

console.log("Question 6:", hasLowRating);



// Station 1 — Question 7: Check pending orders are unrated
const pendingOrdersUnrated = orders
  .filter(({ status }) => status === "pending")
  .every(({ rating }) => rating === null);

console.log("Question 7:", pendingOrdersUnrated);



// Station 1 — Question 8: Get unique customer names
const uniqueNames = [
  ...new Set(orders.map(({ customer }) => customer.name))
];

console.log("Question 8:", uniqueNames);








// Station 2 — Question 2: Total revenue from delivered orders


const deliveredRevenue = orders
  .filter(({ status }) => status === "delivered")
  .reduce((total, order) => {
    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    return total + orderTotal;
  }, 0);

console.log("Station 2 — Question 2: Delivered revenue =", deliveredRevenue, "RWF");



// Station 2 — Question 3: Calculate average rating



const ratedOrders = orders.filter(
  ({ rating }) => rating !== null
);

const averageRating =
  ratedOrders.reduce((sum, { rating }) => sum + rating, 0) /
  ratedOrders.length;

console.log("Station 2 — Question 3: Average rating =", averageRating);



// Station 2 — Question 4: Total Brochette quantity 


const brochetteQty = orders.reduce((total, order) => {
  const quantity = order.items
    .filter(({ name }) => name === "Brochette")
    .reduce((sum, item) => sum + item.qty, 0);

  return total + quantity;
}, 0);

console.log("Station 2 — Question 4: Brochette quantity =", brochetteQty);




 // Station 2 — Question 5: Most expensive order
const orderTotals = orders.map((order) => {
  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return {
    id: order.id,
    customer: order.customer.name,
    total: total
  };
});

console.log("All order totals:", orderTotals);

const mostExpensiveOrder = orderTotals.reduce((highest, order) =>
  order.total > highest.total ? order : highest
);

console.log("Station 2 — Question 5:", mostExpensiveOrder);



// Station 2 — Question 6: Count orders by status
const statusCounts = orders.reduce((counts, order) => {
  counts[order.status] = (counts[order.status] || 0) + 1;
  return counts;
}, {});

console.log("Station 2 — Question 6:", statusCounts);

// Station 2 — Question 7: Count all orders
const totalOrders = orders.length;

console.log("Station 2 — Question 7: Total orders =", totalOrders);


// Station 2 — Question 8: Count unique customers
const uniqueCustomers = new Set(
  orders.map((order) => order.customer.name)
);

console.log(
  "Station 2 — Question 8: Unique customers =",
  uniqueCustomers.size
);