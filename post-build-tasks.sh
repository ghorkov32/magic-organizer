# Yes, i know, three functions for escaping. My mom let me fall from the cradle when i was a child.
function escape_chars() {
  sed -r 's/(\{\}")/\\\1/g'
}
function escape_newlines() {
  sed -z 's/\n/\\n/g'
}

function escape_double_quotes() {
  gawk '{ gsub(/"/,"\\\"") } 1'
}

function format() {
  sha=$(git log -n1 --pretty=format:%h $1 | escape_chars)
  message=$(git log -n1 --pretty=format:%B $1 | escape_newlines | escape_chars | escape_double_quotes)
  author=$(git log -n1 --pretty=format:'%aN <%aE>' $1 | escape_chars)
  commit=$(git log -n1 --pretty=format:%cE $1 | escape_chars)
  date=$(git log -n1 --pretty=format:%cD $1 | escape_chars)
  echo "{\"sha\":\"$sha\",\"message\":\"$message\",\"author\":\"$author\",\"commit\":\"$commit\",\"date\":\"$date\"},"
}

function upload_to_github() {
  VERSION="$(git log -1 --pretty=%B | egrep -o '[0-9]\.[0-9]+\.[0-9]+')" # Getting project version and moving everything
  echo "Moving built project to github page repo"
  rm -rf ../ghorkov32.github.io/magic-organizer
  cp -r ./dist/magic-organizer/ ../ghorkov32.github.io
  cd ../ghorkov32.github.io || exit
  git checkout --orphan newBranch
  git add -A # Add all files and commit them
  git commit -m "Magic-organizer version $VERSION"
  git branch -D master            # Deletes the master branch
  git branch -m master            # Rename the current branch to master
  git push -f origin master       # Force push master branch to github
  git gc --aggressive --prune=all # remove the old files
}

rm log.json
echo "[ " >>log.json
for hash in $(git rev-list --all); do
  format $hash >>log.json
done
echo "]" >>log.json

# Deploy to ghorkov32.github.io
if [ "$1" == "--update-io" ]; then
  echo "Chose to upload to github"
  upload_to_github
fi

echo "Current time took by the project"
grep -o "Took .* minutes" log.json | egrep -o '[0-9]+ hours' | awk '{ sum += $1 } END { print sum " hours" }'
grep -o "Took .* minutes" log.json | egrep -o '[0-9]+ minutes' | awk '{ sum += $1 } END { print sum " minutes" }'
