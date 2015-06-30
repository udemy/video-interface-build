#!/bin/bash
set -e
set -o errexit
# Ensure VideoJS is in a valid state
tag=$(
    cd ../video.js
    >&2 grunt

    if [[ $(git tag --contains $(git rev-parse HEAD) | wc -l | tr -d '[[:space:]]' ) != 1 ]]; then
        >&2 echo "The current commit $(git rev-parse HEAD) should be in only one tag.  Found:"
        >&2 git tag --contains $(git rev-parse HEAD)
        exit 1
    fi

    # exit if the current commit is not the primary one on a tag
    if [[ $(git rev-parse $(git tag --contains $(git rev-parse HEAD))) != $(git rev-parse HEAD) ]]; then
        >&2 echo "The current commit $(git rev-parse HEAD) should be what $(git tag --contains $(git rev-parse HEAD) ) points at"
        exit 1
    fi

    #trim off the 'v' from the beginning
    echo $(git tag --contains $(git rev-parse HEAD) ) | cut -c 2-
)

echo Using tag $tag

python -c "
import json
with open('bower_components/bower.json') as file:
    contents = json.load(file)
videojs = contents['dependencies']['video.js']
(base, hash) = videojs.split('#')
contents['dependencies']['video.js'] = '#'.join([base, '$tag'])
with open('bower_components/bower.json', 'w') as file:
    json.dump(contents, file, indent=4, sort_keys=True)
"
grunt
