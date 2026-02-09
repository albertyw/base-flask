#!/bin/bash

# This script will take the current base-flask repo and scaffold the template
# files for a new project.  This will set up all committed files but will not
# modify your git status.  After this completes, it is suggested that you copy
# all files to a new repository and commit them there

set -exuo pipefail
IFS=$'\n\t'

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPODIR="$BASEDIR/../"

# Replace strings.  MODIFY REPLACEMENTS
declare -A replacements
replacements["\$REPO_PATH"]="\$REPO_PATH"                                # /home/abcd/website/
replacements["\$HOSTNAME"]="\$HOSTNAME"                                  # www.albertyw.com
replacements["\$GIT_REPOSITORY"]="\$GIT_REPOSITORY"                      # git@github.com:albertyw/albertyw.com
replacements["\$PROJECT_NAME"]="\$PROJECT_NAME"                          # albertyw.com
replacements["\$INTERNAL_PORT"]="\$INTERNAL_PORT"                        # 5000
replacements["\$ROLLBAR_SERVER_TOKEN"]="\$ROLLBAR_SERVER_TOKEN"          # abcdefgh
replacements["\$ROLLBAR_CLIENT_TOKEN"]="\$ROLLBAR_CLIENT_TOKEN"          # abcdefgh
replacements["\$GOOGLE_ANALYTICS_TOKEN"]="\$GOOGLE_ANALYTICS_TOKEN"      # abcdefgh
replacements["\$LOGFIT_CLIENT_TOKEN"]="\$LOGFIT_CLIENT_TOKEN"            # abcdefgh
replacements["consumer-vst2b2q9tz5nmmiwpopx"]="\$VARSNAP_CONSUMER_TOKEN" # abcdefgh
replacements["producer-eiwmox20c6930lo5zuth"]="\$VARSNAP_PRODUCER_TOKEN" # abcdefgh

IFS=' '
locations="Dockerfile ${REPODIR}/app ${REPODIR}/bin ${REPODIR}/config ${REPODIR}/.env.production"
for findString in "${!replacements[@]}"; do
    replaceString="${replacements[$findString]}"
    echo "Replacing '${findString}' with '${replaceString}'"
    escapedFindString=$(printf '%s\n' "$findString" | sed -e 's/[]\/$*.^[]/\\&/g');
    escapedReplaceString=$(printf '%s\n' "$replaceString" | sed -e 's/[]\/$*.^[]/\\&/g');
    for location in ${locations}; do
        find "$location" -type f -print0 | xargs -0 sed -i "s/${escapedFindString}/${escapedReplaceString}/g"
    done
done

# Cleanup
cd "$REPODIR"
rm -r baseflask
rm CHANGELOG.md
rm LICENSE
rm README.md
chmod +x bin/*
