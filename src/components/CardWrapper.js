import React from "react";
import PointCard from "./PointCard";
import { getPoints, getMonth } from "../utils";
import "../styles/Wrapper.css";

export default function CardWrapper() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [records, setRecords] = React.useState(null);

  const transformData = () => {
    //generate a unique list of customers based off of all of our transaction records
    const uniqueCustomers = [
      ...new Set(
        records?.map((record) => {
          return record.customerName;
        })
      ),
    ];

    /**
     * generate a new array with data in a shape thats a bit easier to work with,
     * we want an array of customer/transaction objects that make it easier to determine
     * total points per month
     */
    const transformedDataRecords = uniqueCustomers.map((customerName) => {
      /**
       * to make sorting this easier, we add a new prop called "purchaseMonth.
       * we do this here by filtering our records we kept in state for records that match the customers name from the outer loop.
       * We then create a new array, now we can add the new "purchaseMonth" property where we can consume a util function called getMonth
       * which should help display the month in english rather than by a monthID
       */
      const customerTransactionsWithMonth = records
        ?.filter((record) => record.customerName === customerName)
        .map((transactionRecord) => {
          return {
            ...transactionRecord,
            purchaseMonth: getMonth(
              new Date(transactionRecord.purchaseDate).getMonth()
            ),
          };
        });

      /**
       * finally, we just return our new object with properties that make sense for our objective,
       */
      return {
        customerName,
        transactions: [
          ...new Set(
            customerTransactionsWithMonth?.map((record) => {
              return record.purchaseMonth;
            })
          ),
        ].map((month) => {
          const recordsWithinMonth = customerTransactionsWithMonth.filter(
            (record) => record.purchaseMonth === month
          );
          return recordsWithinMonth.map((transaction) => {
            return {
              ...transaction,
              transactionPoints: getPoints(transaction.purchaseAmount),
            };
          });
        }),
      };
    });

    return transformedDataRecords;
  };

  React.useEffect(() => {
    const getTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("./data.json");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const transactionData = await response.json();

        setRecords(transactionData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTransactions();
  }, []);

  const transformedDataRecords = transformData();

  return (
    <div className="wrapperContainer">
      {isLoading ? (
        <div className="wrapperLoadingIndicator">
          <h3 className="pulse">Loading...</h3>
        </div>
      ) : (
        <div className="wrapperContent">
          {transformedDataRecords?.map((record, index) => {
            return (
              <PointCard
                pointsData={record}
                key={`${record.customerName}-${index}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
