const Utils = require('./utils');

const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  const calculatedAmount = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${calculatedAmount}`);
};

module.exports = sendPaymentRequestToApi;
