import React, { useEffect } from "react";

const Insurance_Purchase = () => {
  const [purchase, updatePurchase] = useState([]);
  useEffect(function effectFunction() {
    fetch("")
      .then((response) => response.json())
      .then(({ data: purchase }) => {
        updatePurchase(purchase);
      });
  }, []);
  return purchase.map((insurance_purchase) => (
    <div className="m-5 shadow-md bg-gray-300 rounded-lg p-5 flex flex-col">
      <div>{insurance_purchase.name}</div>
      <div>PDF Viewer</div>
      <div>{insurance_purchase.tenure}</div>
      <div>{insurance_purchase.premium}</div>
      <div>{insurance_purchase.total_amount}</div>
      <div>{insurance_purchase.crops_covered}</div>
    </div>
  ));
};

export default Insurance_Purchase;
