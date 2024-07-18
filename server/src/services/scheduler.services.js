const cron = require("node-cron");

const { deleteExpiredProduct } = require("./staff.services");

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await deleteExpiredProduct();
    console.log(result.message);
  } catch (error) {
    console.error("Failed to delete expired products:", error);
  }
});
