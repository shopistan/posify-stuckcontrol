const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
// const  = require('./index');
const testHelper = require('../../utils/test.helper');
const Purchase = require('../../controllers/purchase') ;

beforeEach(testHelper.setupTest);
describe('Purchase', () => {
  describe('oderlist', () => {
    it('should return array of purchase order list', async () => {
      const result = await Purchase.all();
      console.log(result)
      expect(typeof result).to.equal('object');
    });
    it('should return count of the purchase order count', async () => {
      const result = await Purchase.count();
      console.log(result)
      expect(typeof result.data.count).to.equal('number');
    });
  });
});

describe('vender create', () => {
  describe('record', () => {
    it('should return array of vender list', async () => {
      const result = await Purchase.vendorall();
      console.log(result)
      expect(typeof result).to.equal('object');
    });
    it('should return count of the vendor', async () => {
      const result = await Purchase.vendor_count();
      console.log(result)
      expect(typeof result.data.count).to.equal('number');
    });
  });
});

