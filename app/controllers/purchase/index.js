const { Purchase } = require("../../models");
const { vendor } = require("../../models");
// const { PurchaseSchema } = require('../../utils/validator');
const axios = require("axios");

const SNS = require("../../utils/sns");
const { snsTopics } = require("../../config/keys");

const sqs = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
  isSqs: true,
});
const sns = SNS({
  isOffline: false,
});

const all = async () => {
  try {
    const Purchasess = await Purchase.find({});
    return { data: Purchasess };
  } catch (err) {
    console.log("Error:", err);
  }
};

const vendorall = async () => {
  try {
    const vendorss = await vendor.find({});
    return { data: vendorss };
  } catch (err) {
    console.log("Error:", err);
  }
};

const vendor_count = async () => {
  try {
    const VendorCount = await vendor.count({});
    return { data: { count: VendorCount } };
  } catch (err) {
    console.log("Error:'", err);
  }
};

const count = async () => {
  try {
    const PurchaseCount = await Purchase.count({});
    return { data: { count: PurchaseCount } };
  } catch (err) {
    console.log("Error:'", err);
  }
};

const findById = async (id) => {
  try {
    const Purchase = await Purchase.findOne({ _id: id });
    return Purchase;
  } catch (err) {
    console.log("Error: ", err);
  }
};
const create_purchase_order = async ({ body }) => {
  try {
    console.log("//////resquest");
    console.log(body);
    const {
      items,
      vendor_Name,
      vendor_phone,
      vendor_email,
      vendor_addressLine1,
      vendor_addressLine2,
      vendor_city,
      vendor_country,
      status,
    } = body;
    let newVendor = new vendor({
      vendor_Name,
      vendor_phone,
      vendor_email,
      address: {
        vendor_addressLine1,
        vendor_addressLine2,
        vendor_city,
        vendor_country,
      },
    });
    let data = await newVendor.save();
    for (item of items) {
      let newPurchase = new Purchase({
        SKU: item.sku,
        quantity: item.quantity,
        price: item.price,
        vendor_email,
        status,
      });
      let data1 = await newPurchase.save();
    }
    console.log(vendor_email);
    sns
      .publish({
        Message: JSON.stringify({
          method: "purchase",
          item,
        }),
        Subject: "snsPurchaseCreatedTopic",
        TopicArn: snsTopics.snsPurchaseCreatedTopic,
      })
      .promise()
      .then((r) => console.log(r));

    await sqs
      .sendMessage({
        MessageBody: JSON.stringify({
          to: vendor_email,
          body: {
            text: "purchase order",
            htmlData: items,
          },
        }),
        QueueUrl: `https://sqs.us-east-1.amazonaws.com/${process.env.awsAccountId}/posifyEmailQueue`,
      })
      .promise()
      .then((r) => console.log(r));

    return { statusCode: 200, data };
  } catch (err) {
    console.log(err);

    return { statusCode: 400, message: err.message };
  }
};

const deletePurchase = async ({ id }) => {
  try {
    let { PurchaseCount } = await Purchase.deleteOne({ _id: id });
    return { statusCode: 200, data: { PurchaseCount } };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};
const updatePurchase = async ({ id, ...updCustomer }) => {
  try {
    let { nModified } = await Purchase.updateOne({ _id: id }, updCustomer);
    return { statusCode: 200, data: { modifiedCount: nModified } };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};
module.exports = {
  all,
  count,
  create_purchase_order,
  deletePurchase,
  updatePurchase,
  findById,
  vendorall,
  vendor_count,
};
