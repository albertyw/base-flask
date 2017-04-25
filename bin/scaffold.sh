#!/bin/bash

# This script will take the current base-flask repo and scaffold the template
# files for a new project.  This will set up all committed files but will not
# modify your git status.  After this completes, it is suggested that you copy
# all files to a new repository and commit them there

set -e

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPODIR="$BASEDIR/../"

declare -A replacements
replacements=( \
  ["\$HOSTNAME"]="\$HOSTNAME" \
  ["\$GIT_REPOSITORY"]="\$GIT_REPOSITORY" \
  ["\$PROJECT_NAME"]="\$PROJECT_NAME" \
  ["\$NEWRELIC_KEY"]="\$NEWRELIC_KEY" \
  ["\$ROLLBAR_SERVER_TOKEN"]="\$ROLLBAR_SERVER_TOKEN" \
  ["\$ROLLBAR_CLIENT_TOKEN"]="\$ROLLBAR_CLIENT_TOKEN" \
  ["\$SEGMENT_TOKEN"]="\$SEGMENT_TOKEN" \
)
locations="${REPODIR}/app ${REPODIR}/bin ${REPODIR}/config ${REPODIR}/.env.production"
for findString in "${!replacements[@]}"; do
    replaceString="${replacements[$findString]}"
    echo "Replacing '${findString}' with '${replaceString}'"
    for location in "${locations}"; do
        find $location -type f -print0 | xargs -0 sed -i "s/${findString}/${replaceString}/g"
    done
done

rm bin/scaffold.sh
