'use strict';
const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../src/models/Users'); // Assuming this is your User model
const authentication = require('../../src/middlewares/authentication'); // Assuming this is your authentication middleware
const { signup, login } = require('../../src/controllers/authController'); // Assuming these are your auth controller functions

describe('Auth Controller', () => {
  describe('Signup Function', () => {
    it('should return 400 if required fields are missing', async () => {
      const req = { body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await signup(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ status: 400, message: 'Please provide Username, Email and Password', data: {} })).to.be.true;
    });

    // Add more unit tests for different scenarios of signup function
  });

//   describe('Login Function', () => {
//     it('should return 400 if email or password are missing', async () => {
//       const req = { body: {} };
//       const res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.spy(),
//       };

//       await login(req, res);

//       expect(res.status.calledWith(200)).to.be.true;
//       expect(res.json.calledWith({ status: 400, message: 'Please provide Email and Password', data: {} })).to.be.true;
//     });

//     // Add more unit tests for different scenarios of login function
//   });
});
