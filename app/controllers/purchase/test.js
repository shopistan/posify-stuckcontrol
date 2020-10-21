const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-as-promised"));
const faker = require("faker");
// const  = require('./index');
const testHelper = require("../../utils/test.helper");
const Purchase = require("../../controllers/purchase");
const purchase = require("../../controllers/purchase");
beforeEach(testHelper.setupTest);
let _id = "";
const getPurcahseBody = () => {
  return {
    items: [
      {
        sku: faker.commerce.productAdjective(),
        quantity: 3,
        price: faker.commerce.price(),
      },
      {
        sku: faker.commerce.productAdjective(),
        quantity: 3,
        price: faker.commerce.price(),
      },
    ],
    vendor_Name: faker.internet.userName(),
    vendor_phone: faker.phone.phoneNumber(),
    vendor_email: faker.internet.email(),
    Address: {
      vendor_addressLine1: faker.address.streetAddress(),
      vendor_addressLine2: faker.address.secondaryAddress(),
      vendor_city: faker.address.city(),
      vendor_country: faker.address.country(),
    },
    status: 1,
  };
};

describe("Vendor", () => {
  describe("Insert", () => {
    it("should insert purchase data", async () => {
      let body = getPurcahseBody();
      const result = await Purchase.create_purchase_order({ body });
      _id = result.data._id;
      expect(result.data.vandor_name).to.equal(body.vendor_name);
      expect(result.data.vendor_phone).to.equal(body.vendor_phone);
      expect(result.data.vendor_email).to.equal(body.vendor_email);
    });
  });
});

describe("Vendor", () => {
  describe("delete", () => {
    it("should delete purchase order", async () => {
      let body = getPurcahseBody();
      const result = await Purchase.deletePurchase({ id: _id });
      expect(result.statusCode).to.equal(200);
    });
  });
});

describe("Purchase", () => {
  describe("oderlist", () => {
    it("should return array of purchase order list", async () => {
      const result = await Purchase.all();
      console.log(result);
      expect(typeof result).to.equal("object");
    });
    it("should return count of the purchase order count", async () => {
      const result = await Purchase.count();
      console.log(result);
      expect(typeof result.data.count).to.equal("number");
    });
  });
});

describe("vender create", () => {
  describe("record", () => {
    it("should return array of vender list", async () => {
      const result = await Purchase.vendorall();
      console.log(result);
      expect(typeof result).to.equal("object");
    });
    it("should return count of the vendor", async () => {
      const result = await Purchase.vendor_count();
      console.log(result);
      expect(typeof result.data.count).to.equal("number");
    });
  });
});
