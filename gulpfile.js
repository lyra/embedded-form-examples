const replace = require('gulp-replace')
const { src, dest, task, parallel } = require('gulp')

const keyMap = {
  '~~CHANGE_ME_USER~~': '69876357',
  '~~CHANGE_ME_PASSWORD~~': 'testpassword_DEMOPRIVATEKEY23G4475zXZQ2UA5x7M',
  '~~CHANGE_ME_PUBLIC_KEY~~':
    '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5',
  '~~CHANGE_ME_ENDPOINT~~': 'https://api.lyra.com',
  '~~CHANGE_ME_HMAC_SHA256_KEY~~': '38453613e7f44dc58732bad3dca2bca3',
  '~~CHANGE_ME_ENDPOINT_NO_HTTPS~~': 'api.lyra.com'
}

task('replacements:examples', () => {
  let stream = src([
    './.examples/**/*.html',
    './.examples/**/*.js',
    '!./.examples/**/node_modules/**/*js'
  ])
  Object.entries(keyMap).forEach(([key, value]) => {
    stream = stream.pipe(replace(key, value))
  })
  return stream.pipe(dest('./.examples/'))
})

task('replacements:server', () => {
  let stream = src(['./.server/*.js', '!./.server/**/node_modules/**/*js'])
  Object.entries(keyMap).forEach(([key, value]) => {
    stream = stream.pipe(replace(key, value))
  })
  return stream.pipe(dest('./.server/'))
})

task('default', parallel('replacements:examples', 'replacements:server'))
