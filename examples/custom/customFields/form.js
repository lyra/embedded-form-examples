import KRGlue from '@lyracom/embedded-form-glue'

const endpoint = '~~CHANGE_ME_JAVASCRIPT_ENDPOINT~~'
const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
const CREATE_PAYMENT_ENDPOINT = 'http://localhost:3000/createPayment'
const CREATE_PAYMENT_CONF = { amount: 10000, currency: 'EUR' }

const getFormToken = async () => {
  const response = await fetch(CREATE_PAYMENT_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ paymentConf: CREATE_PAYMENT_CONF })
  })
  return response.json()
}

const setupForm = async () => {
  const { formToken } = await getFormToken()
  // Load payment library using KRGlue dep
  let { KR, result } = await KRGlue.loadLibrary(endpoint, publicKey)
  // Set the payment token (should be previously generated)
  await KR.setFormConfig({ formToken, language: 'en' })
  // Payment done callback register
  await KR.onSubmit(response => {
    // The payment response is here
    let paymentResponse = response
    let serializedResponse = JSON.stringify(paymentResponse.post())
    let p = document.createElement('p')
    p.innerHTML = serializedResponse
    document.body.appendChild(p)
  })

  // ensuring that the general conditions are accpeted before continuing the payment
  await KR.smartForm.onClick(function ({ paymentMethod, action }) {
    if (action === 'beforePaymentStart') {
      const checkbox = document.getElementById('checkboxExample')
      if (!checkbox?.checked) {
        KR.throwCustomError(
          'Please do accept the general conditions before continuing',
          paymentMethod
        )

        // Stop the payment process
        return false
      }

      // continue the payment process
      return true
    }
  })

  // render
  ;({ result } = await KR.renderElements())
}

try {
  setupForm()
} catch (error) {
  console.error(error)
}
