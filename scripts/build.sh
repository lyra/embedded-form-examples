#!/bin/bash

rm -r .examples
mkdir .examples

npm ci --prefix examples/custom/errors/errorsByField 

wait

npm run build --prefix examples/custom/errors/errorsByField

gulp replacements:examples
