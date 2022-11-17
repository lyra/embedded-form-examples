import KRGlue from '@lyracom/embedded-form-glue'

const endpoint = '~~CHANGE_ME_ENDPOINT~~'
const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
const CREATE_PAYMENT_ENDPOINT = 'http://localhost:3000/createPayment'
const CREATE_PAYMENT_CONF = { amount: 10000, currency: 'USD' }

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
  await KR.setFormConfig({ formToken })
  // Payment done callback register
  await KR.onSubmit(response => {
    // The payment response is here
    let paymentResponse = response
    let serializedResponse = JSON.stringify(paymentResponse.post())
    let p = document.createElement('p')
    p.innerHTML = serializedResponse
    document.body.appendChild(p)
  })
  // Error callback register
  await KR.onError(err => {
    if (err.children && err.children.length) {
      for (const child of err.children) {
        if (child.field) {
          const $err = document.querySelector(`.${child.field}.field-error`)
          $err.innerHTML = child.errorMessage
          $err.classList.add('visible')
        }
      }
    }
  })
  // On field update callback - remove the errors
  await KR.setFormConfig({
    fields: {
      events: {
        onUpdate: data => {
          for (const $error of document.querySelectorAll(`.field-error`))
            $error.classList.remove('visible')
        }
      }
    }
  })
  // Attach a new form
  ;({ result } = await KR.attachForm('#myPaymentForm'))
  // SHow the form
  await KR.showForm(result.formId)
}

try {
  setupForm()
} catch (error) {
  console.error(error)
}
