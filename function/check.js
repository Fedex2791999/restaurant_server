module.exports = {
  booking: (element, array) => {
    let check = 1;
    array.forEach((data, index) => {
      if (element.phone === data.phone) check = -2;
      if (
        element.date === data.date &&
        element.time === data.time &&
        element.number_table === data.number_table
      )
        check = 0;
      if (
        element.phone === data.phone &&
        element.time === data.time &&
        element.date === data.date
      )
        check = -1;
    });
    return check;
  },
  feedback: (element, array) => {
    let check = 1;
    array.forEach((data, index) => {
      if (element.phone === data.phone) check = -1;
    });
    return check;
  }
};
