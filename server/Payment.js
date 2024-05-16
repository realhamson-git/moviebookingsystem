const crypto = require('crypto');
const axios = require('axios');

const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

class Payment {
    constructor( txnId,  amount ) {
        this.amount = amount
        this.txnId = txnId
    }

    // create_checksum = ( ) => {

    //     const orderData = {
    //         "merchantId": process.env.MERCHANT_ID_WEB,
    //         "merchantTransactionId": String( this.txnId ),
    //         "merchantUserId": String( this.userID ),
    //         "amount": this.amount * 100,
    //         "redirectUrl": `${process.env.REDIRECT_SERVER_URL}/api/phonepay-status`,
    //         "redirectMode": "POST",
    //         "callbackUrl": `${process.env.REDIRECT_SERVER_URL}/api/phonepay-status`,
    //         "mobileNumber": "9999999999",
    //         "paymentInstrument": {
    //             "type": "PAY_PAGE"
    //         }
    //     };

    //     const b64Data = Buffer.from(JSON.stringify(orderData)).toString('base64')
    //     const checksum = crypto.createHash('sha256')
    //         .update(b64Data + '/pg/v1/pay' + process.env.MERCHANT_KEY_WEB)
    //         .digest('hex') + '###' + process.env.KEY_INDEX

    //     return { b64Data, checksum }
    // }


    create_payment = async function () {
        try {
            // let { b64Data, checksum } = this.create_checksum()

            // let check = await axios.post(process.env.URL, { request: b64Data }, { headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-VERIFY': checksum } })
            // return check

            const options = {
                amount: this.amount, // amount in smallest currency unit
                currency: "INR",
                receipt: `receipt_${ this.txnId }`,
            };

            return await instance.orders.create(options);

        } catch (error) { return error }
    }
}


module.exports = Payment
