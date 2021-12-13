
const Order = require('../models/order')
const { getPaymentDetail, generatePaymentIntent, generatePaymentMethod} = require('../helpers/stripe')

//TODO: Buscamos orden y y solictamos a stripe los detalles

const checkItem = async (req, res) => {
    try {
        const { id } = req.params;
        const resOrder = await Order.findOne({ localizator: id })
        const detailStripe = await getPaymentDetail(resOrder.stripeId)

        const status = detailStripe.status.includes('succe') ? 'success' : 'fail'

        //TODO: Actualizamos nuestra orden con el estatus

        await Order.findOneAndUpdate({ localizator: id }, { status })

        res.send({ data: detailStripe })

    } catch (e) {
        console.log(e.message)
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}
const getItem = async (req, res) => {
    const { id } = req.params
    console.log("Entro aki", id)

    const userData = await Order.findOne({ localizator: id })
    res.send({ data: userData })
}

const postItem = async (req, res) => {
    try {
        const { amount, name } = req.body
        const oderRes = await Order.create({
            name,
            amount
        })

        res.send({ data: oderRes })
    } catch (e) {
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.body

        const resOrder = await Order.findOne({ localizator: id })
        const responseMethod = await generatePaymentMethod(token) 
        const resPaymentIntent = await generatePaymentIntent(
            {
                amount: resOrder.amount,
                user: resOrder.name,
                payment_method: responseMethod.id
            }
        )

        await Order.findOneAndUpdate({ localizator: id }, {
            stripeId: resPaymentIntent.id
        })

        res.send({ data: resPaymentIntent })

    } catch (e) {
        console.log(e.message)
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}

module.exports={
    checkItem, 
    postItem, 
    getItem,
    updateItem
}