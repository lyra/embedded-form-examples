const axios = require('axios').default

exports.createFormToken = async paymentConf => {
  console.log(paymentConf)
  const createPaymentEndpoint = `https://69876357:testpassword_DEMOPRIVATEKEY23G4475zXZQ2UA5x7M@api.lyra.com/api-payment/V4/Charge/CreatePayment`

  try {
    const response = await axios.post(createPaymentEndpoint, paymentConf, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data)
    if (!response?.data?.answer?.formToken) throw response
    return response.data.answer.formToken
  } catch (error) {
    throw error
  }
}
