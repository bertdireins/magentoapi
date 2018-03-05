// external dependencies
var events = require('events');
var util = require('util');

// internal dependencies
var prototypeBase = require('../prototype_base.js');
var curry = require('../curry.js');

/**
  Allows you to create, retrieve, update, and delete data about customers.
*/
function Pricepercustomer() {
  this.prefix = 'pricepercustomer.';
}
util.inherits(Pricepercustomer, events.EventEmitter);


// prototypes we will be applying
var protos = {
  /**
    Create a new customer.
  */
  create: {
    mandatory: 'pricepercustomerData',
    modifiers: {
      // to do: figure out why this was causing an issue
      // customerData: ensureArray
    }
  },

  /**
    Delete the required customer.
  */
  'delete': {
    mandatory: 'pricepercustomerId'
  },

  /**
    Retrieve information about the specified customer.
  */
  info: {
    mandatory: 'pricepercustomerId',
    optional: 'attributes',
    modifiers: {
      attributes: ensureArray
    }
  },

  /**
    Allows you to retrieve the list of customers.
  */
  list: {
    optional: 'filters',
    modifiers: {
      // filters: ensureArray
    }
  },

  /**
    Update information about the required customer.
    Note that you need to pass only those arguments which you want to be updated.
  */
  update: {
    mandatory: 'pricepercustomerId,pricepercustomerData',
    modifiers: {
      //customerData: ensureArray
    }
  }
};

function ensureArray(val) {
  if (!Array.isArray(val)) {
    return [ val ];
  }

  return val;
}

// creating prototypes using curry func
for (var key in protos) {
  Pricepercustomer.prototype[key] = curry(prototypeBase, key, protos[key]);
}
protos = undefined;

module.exports = Pricepercustomer;
