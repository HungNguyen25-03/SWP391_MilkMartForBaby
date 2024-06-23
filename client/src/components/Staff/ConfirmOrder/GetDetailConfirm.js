import React, { useEffect, useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
import { MainAPI } from "../../API";

export default function GetDetailConfirm() {
  const [dataConfirm, setDataConfirm] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch(`${MainAPI}/staff/order`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch data get order");

      const data = await response.json();
      setDataConfirm(data);
    } catch (error) {
      console.error("Error fetching data order:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{dataConfirm && <ConfirmOrder dataConfirm={dataConfirm} />}</div>;
}
