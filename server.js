const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1465750830853525674/OZPee2EXHZqSkJ29nfJnR5jIPtr_YYYZcK6omMdj0MjtVHWT-vo6zBFJTwTE6Uo14adR";

app.post("/order", async (req, res) => {

  const { user, service, quantity } = req.body;

  const message = {
    content: `📦 New Order

User: ${user}
Service: ${service}
Quantity: ${quantity}`
  };

  await axios.post(DISCORD_WEBHOOK, message);

  res.json({ success: true });

});

app.listen(3000, () => {
  console.log("Server running");
});