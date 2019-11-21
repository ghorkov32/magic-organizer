
function escape_chars() {
  sed -r 's/(\{\}")/\\\1/g'
}
function escape_newlines() {
  sed -z 's/\n/\\n/g'
}

function format() {
  sha=$(git log -n1 --pretty=format:%h $1 | escape_chars)
  message=$(git log -n1 --pretty=format:%B $1 | escape_newlines | escape_chars)
  author=$(git log -n1 --pretty=format:'%aN <%aE>' $1 | escape_chars)
  commit=$(git log -n1 --pretty=format:%cE $1 | escape_chars)
  date=$(git log -n1 --pretty=format:%cD $1 | escape_chars)
  echo "{\"sha\":\"$sha\",\"message\":\"$message\",\"author\":\"$author\",\"commit\":\"$commit\",\"date\":\"$date\"}"
}

rm log.json
for hash in $(git rev-list --all); do
  format $hash >>log.json
done

if [ "$1" != "--move" ]; then
  echo "Moving built project to github page repo"
  mv ./dist/magic-organizer/ ../ghorkov32.github.io/magic-organizer
fi

echo "Current time took by the project"
grep -o "Took .* minutes" log.json | egrep -o '[0-9]+ hours' | awk '{ sum += $1 } END { print sum " hours" }'
grep -o "Took .* minutes" log.json | egrep -o '[0-9]+ minutes' | awk '{ sum += $1 } END { print sum " minutes" }'
