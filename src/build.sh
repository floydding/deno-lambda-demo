#!/usr/bin/env bash

set -e

DENO_DIR=.deno_dir deno cache index.ts
cp -R .deno_dir/gen/file/$PWD/ .deno_dir/LAMBDA_TASK_ROOT

zip lambda.zip -x '.deno_dir/gen/file/*' -r .deno_dir index.ts  # other source files
