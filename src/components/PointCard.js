import React from "react";
import { getTotalPoints } from "../utils";
import "../styles/PointCard.css";

export default function PointCard({ pointsData }) {
  const customerTotalPoints = pointsData?.transactions
    ?.map((transactionRecord) => {
      return transactionRecord.map((record) => record.transactionPoints);
    })
    .flat(1)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="pointCardContainer">
      <div className="pointCardHeading">
        <h1>{pointsData?.customerName}</h1>
        <h2>Total Points Earned: {customerTotalPoints}</h2>
      </div>
      <div className="pointCardBody">
        {pointsData?.transactions?.map((transaction, index) => {
          return (
            <div className="transactionContainer" key={`${index}`}>
              <h3>{transaction[0].purchaseMonth} Transactions</h3>
              {transaction.map((transactionRecord) => {
                return (
                  <div
                    className="transactionDetailsContainer"
                    key={`${transactionRecord.transactionID}`}
                  >
                    <p>Purchase Date: {transactionRecord.purchaseDate}</p>
                    <p>Purchase Amount: ${transactionRecord.purchaseAmount}</p>
                    <p>
                      Transaction Points:{" "}
                      <strong>{transactionRecord.transactionPoints}</strong>
                    </p>
                  </div>
                );
              })}
              <h3 className="totalPointsSummaryText">
                Total Points for {transaction[0].purchaseMonth}:{" "}
                {getTotalPoints(transaction)}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
