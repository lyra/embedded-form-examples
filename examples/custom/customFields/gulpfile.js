;`use strict`

const { task, parallel, series, src, dest } = require(`gulp`)
const esbuild = require('esbuild')

task(`html`, () =>
  src([`./index.html`]).pipe(
    dest(`../../../.examples/custom/customFields`)
  )
)

task(`build:js`, async () => {
  await esbuild.build({
    entryPoints: ['form.js'],
    bundle: true,
    outfile: '../../../.examples/custom/customFields/dist.js'
  })
})

// BUILD
task(`build`, parallel(['build:js', 'html']))
task('default', series(`build`))
