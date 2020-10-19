'use strict' ;
require('./app/config/db') ;
const send = require('./app/utils/response') ;
const Purchase = require('./app/controllers/purchase') ;
const { formatBody } = require('./app/utils/helpers') ;

const countPurchase = async (event, context) => {
  // console.log('NODE_ENV', process.env.IS_OFFLINE);
  let response = await Purchase.count();
  return send(response) ;
 };

const getAllPurchase = async (event, context) => {
  let response = await Purchase.all();
  return send(response);
 };

const create_purchase_order = async (event, context) => {
  const request = formatBody(event);
  console.log('event.Record', request);
  let response = await Purchase.create_purchase_order(request.source, request.body);
  return send(response);
 };
const deletePurchase = async (event, context) => {
  console.log('event.Record', event.pathParameters);
  let response = await Purchase.deletePurchase(event.pathParameters);
  return send(response);
 };
const updatePurchase = async (event, context) => {
  const request = formatBody(event);
  console.log('event.Record', event.pathParameters);
  let response = await CustomersController.deletePurchase({...event.pathParameters,...request.body});
  return send(response);
 };

const listener = async (event, context) => {
  console.log(event.Records[0].Sns)
  return true;
 };
module.exports = {
  count: countPurchase,
  all: getAllPurchase,
  create_purchase_order: create_purchase_order,
  delete: deletePurchase,
  update: updatePurchase,
  listener:listener,
};
