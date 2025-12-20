#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "Please provide out dir"
  exit 1
fi

rm -rf $1 && \
swc ./src -d $1 --strip-leading-paths --copy-files
