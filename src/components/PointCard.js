import React from "react";
import { getTotalPoints } from "../utils";
import "../styles/PointCard.css";

export default function PointCard({ pointsData }) {
  return (
    <div className="pointCardContainer">
      <h1 className="pointCardHeading">{pointsData?.customerName}</h1>
      <div className="pointCardBody">
        {pointsData?.transactions?.map((transaction) => {
          return (
            <div className="transactionContainer">
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
