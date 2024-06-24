import React from "react";

const REST_HOST = import.meta.env.VITE_REST_HOST;
const MACAROON = import.meta.env.VITE_MACAROON;

const App = () => {
  const getInfo = async () => {
    try {
      const response = await fetch(`https://${REST_HOST}/v1/getinfo`, {
        method: "GET",
        headers: {
          "Grpc-Metadata-macaroon": MACAROON,
        },
      });
      const data = await response.json();
      console.log("getInfo", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createInvoice = async () => {
    try {
      const response = await fetch(`https://${REST_HOST}/v1/invoices`, {
        method: "POST",
        headers: {
          "Grpc-Metadata-macaroon": MACAROON,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: 100, // Invoice amount in satoshis
          memo: "Test invoice", // Optional memo for the invoice
        }),
      });
      const data = await response.json();
      console.log("createInvoice", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const payInvoice = async () => {
    try {
      const response = await fetch(
        `https://${REST_HOST}/v1/channels/transactions`,
        {
          method: "POST",
          headers: {
            "Grpc-Metadata-macaroon": MACAROON,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_request: "lntbs100u1pnye333sp5suk6usyvgdda4hqulfml5l0jnaxnhvl2q7ngchz5ryexkzk528lspp5m582xf404xqhn4q0yptx5ycznhagw728neqk52wqe4luspupdvgsdqqnp4qtqhghfp42egydy42enq0pmc2xdw2hwz4qh0peexsdq06wynxc4kxxqrrsxcqzzn9qyysgqtnee52f9xjpf9gw3dnawkeuku3p40md60flas75yetpa9jw4lcfsfyz567meyh2ggsp9xyk0vqp0c9mg3w325dy840zr46va9szadhcpfytxct", // Paste the invoice's payment request here
          }),
        },
      );
      const data = await response.json();
      console.log("payInvoice", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>LND REST API Example</h1>
      <button onClick={getInfo}>Get Info</button>
      <button onClick={createInvoice}>Create Invoice</button>
      <button onClick={payInvoice}>Pay Invoice</button>
    </div>
  );
};

export default App;
