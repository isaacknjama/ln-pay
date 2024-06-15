import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 4000;
const accountId = process.env.ACCOUNT_ID;
const getAccountDetailsUrl = process.env.BASE_URL + "/v2/account/" + accountId;
const authToken = process.env.AUTH_TOKEN;
let bolt11 = "";

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/get-account-details", async (req, res) => {
  const url = `${getAccountDetailsUrl}`;
  console.log(`Requesting URL: ${url}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `${authToken}`,
    },
  });

  if (!response) {
    console.error(response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Response data:", data);
  res.json(data);
});

app.post("/create-ln-invoice", async (req, res) => {
  try {
    const lnInvoiceUrl = `${process.env.BASE_URL}/invoice/add`;
    console.log(`Creating LN invoice at ${lnInvoiceUrl}`);

    const response = await fetch(lnInvoiceUrl, {
      method: "POST",
      headers: {
        Authorization: `${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountMsat: 1000,
        accountId: accountId,
        expiration: 900,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const bolt11 = data.bolt11;
    console.log("BOLT 11: ", bolt11);
    console.log("Response data:", data);
    res.json(data); // Send back the response from the API
  } catch (error) {
    console.error("Error creating LN invoice:", error);
    res.status(500).json({ error: error.message }); // Send error response
  }
});

app.post("/pay-invoice", async (req, res) => {
  try {
    const payInvoiceUrl = `${process.env.BASE_URL}/v2/invoice/pay`;

    const response = await fetch(payInvoiceUrl, {
      method: "POST",
      headers: {
        Authorization: `${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountId,
        bolt11:
          "lnbc1pnx4lwgpp52e6u0wvnwp8y7lu4nprnfh6jynwhu9n2c0tsd8aveex4w5aawndsdqqcqzzsxqyz5vqsp5l4ll6mnvmfna2nrmkw7u7q4wr2rktcqywy7x4a7lkwkfq8m4cjss9qyyssqzqacwjj0dg79djx2004gzmkph82q4vzthjfda4yyk2j72wn9c7y3xp3csvdjh3wcr50kpl7dwdwv823m98c2qy8cxmm8ngck4yg9x8sp4fk0dr",
        amount: 1000,
      }),
    });

    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    res.json(data);
  } catch (err) {
    console.error("Error creating LN invoice:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
