const request = require('request');
const expect = require('chai').expect;

describe('Index page', () => {
  // ... (tests for the index page remain the same)
});

describe('Cart page', () => {
  // ... (tests for the cart page remain the same)
});

describe('/available_payments', () => {
  it('should return status code 200', (done) => {
    request('http://localhost:7865/available_payments', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct payment methods object', (done) => {
    request('http://localhost:7865/available_payments', (error, response, body) => {
      expect(JSON.parse(body)).to.deep.equal({
        payment_methods: {
          credit_cards: true,
          paypal: false,
        },
      });
      done();
    });
  });
});

describe('/login', () => {
  it('should return status code 200', (done) => {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Betty' },
      },
      (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('should return "Welcome :username"', (done) => {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Betty' },
      },
      (error, response, body) => {
        expect(body).to.equal('Welcome Betty');
        done();
      }
    );
  });
});
