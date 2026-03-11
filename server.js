const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1465750830853525674/OZPee2EXHZqSkJ29nfJnR5jIPtr_YYYZcK6omMdj0MjtVHWT-vo6zBFJTwTE6Uo14adR";

app.post("/order", async (req, res) => {
  try {
    const { user, service, quantity } = req.body;

    console.log("Received order:", req.body);

    const message = {
      content: `📦 New Order

User: ${user}
Service: ${service}
Quantity: ${quantity}`
    };

    const discordRes = await axios.post(DISCORD_WEBHOOK, message);

    console.log("Discord webhook sent:", discordRes.status);

    res.json({ success: true });
  } catch (err) {
    console.error("Server error:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});