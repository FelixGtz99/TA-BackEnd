const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SK)

const generatePaymentIntent = async ({ amount, user, payment_method }) => {
    const resPaymentIntent = await stripe.paymentIntents.create({
        amount: parseFloat(amount) * 100,
        currency: process.env.STRIPE_CURRENCY,
        payment_method_types: ['card'],
        payment_method,
        description: `${user}: Pago`
    });


    return resPaymentIntent

}

const confirmPaymentIntent = async (id, token) => {
    const paymentIntent = await stripe.paymentIntents.confirm(
        id,
        { payment_method: token }
    );

    console.log(paymentIntent)

    return paymentIntent
}


const generatePaymentMethod = async (token) => {

    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: { token }
    });

    return paymentMethod
}


const getPaymentDetail = async (id) => {
    const detailOrder = await stripe.paymentIntents.retrieve(id)
    return detailOrder
}

module.exports = {
    generatePaymentIntent,
    getPaymentDetail,
    confirmPaymentIntent,
    generatePaymentMethod
}