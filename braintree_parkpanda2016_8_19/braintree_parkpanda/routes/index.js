var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "fny889dtvrnpn64g",
  publicKey: "bxzxqb9j35q7653q",
  privateKey: "543bc99debc05809409d0c2b556510d3"
});

/* POST Creates a new token and returns it in the response */
router.get('/token', function (req, res) {
  gateway.clientToken.generate(null, function (error, response) {
    res.json(response);
	console.log("token ok");
  });
});

/* POST Handles the amount & payment method nonce to execute a transaction */
router.post('/payment', function (req, res) {
  var sale = {
	merchantAccountId: "parkpanda",  
    amount: req.param('amount'),
    payment_method_nonce: req.param('payment_method_nonce')
  };
  
  console.log("amount :" + req.param('amount')); 
  console.log("nonce :" + req.param('payment_method_nonce')); 

  gateway.transaction.sale(sale, function (error, response) {
    if (!error && response.success) {
      res.json(response);
		console.log("payment ok"); 
    } else {
      // show an error message
		console.log("payment error"); 
}
  });
});

module.exports = router;
