#!/bin/bash

raw_dir=./../raw
ls $raw_dir > ../utils/patterns.txt

# parsed_dir=./../parsed
# mkdir $parsed_dir
# for pattern_file in $(ls $raw_dir)
# do
#   pattern_name=$(basename $pattern_file .cells | tr . _)
#   target=$parsed_dir/$pattern_name.ts
#   touch $target
#   printf "export const P_${pattern_name^^} = \`\\

#     $(cat $raw_dir/$pattern_file)\\

#     \`;" | tr -d '
# ' > $target
# done
