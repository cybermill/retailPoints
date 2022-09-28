export const getPoints = (totalSpent) => {
  if (totalSpent > 100) {
    const doublePoints = (totalSpent - 100) * 2;
    const singlePoints = 50;

    const totalPoints = doublePoints + singlePoints;

    return totalPoints;
  }

  if (totalSpent <= 100 && totalSpent > 50) {
    return totalSpent - 50;
  }

  return 0;
};

export const getMonth = (monthID) => {
  switch (monthID) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";

    default:
      return "Unrecognized MonthID";
  }
};

export const getTotalPoints = (transactionMonth) => {
  const sumOfPoints = transactionMonth.reduce((accumulator, object) => {
    return accumulator + object.transactionPoints;
  }, 0);

  return sumOfPoints;
};
