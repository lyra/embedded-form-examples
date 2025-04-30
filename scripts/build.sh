#!/bin/bash

rm -r .examples
mkdir .examples

npm ci --prefix examples/custom/errors/errorsByField 
npm ci --prefix examples/custom/customFields 


wait

npm run build --prefix examples/custom/errors/errorsByField
npm run build --prefix examples/custom/customFields


gulp replacements:examples
