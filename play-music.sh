#!/bin/bash

trackName="$1"

osascript -e "
tell application \"Music\"
   play track \"$trackName\"
end tell
"
