const sinon = require('sinon');
const expect = require('chai').expect;
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('should call calculateNumber with the correct arguments', () => {
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10); // Stub always returns 10
    const spy = sinon.spy(console, 'log'); // Spy on console.log

    sendPaymentRequestToApi(100, 20);

    expect(stub.calledWith('SUM', 100, 20)).to.be.true;
    expect(spy.calledWith('The total is: 10')).to.be.true;

    stub.restore(); // Restore original function
    spy.restore();
  });
});