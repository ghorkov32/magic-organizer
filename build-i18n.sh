echo "building en"
ng build --output-path=dist/magic-organizer/en \
--aot \
--prod \
--base-href . \
--source-map=false
\
for lang in de es fr it pt ru; do
  \
  echo "building $lang"
  ng build --output-path=dist/magic-organizer/$lang \
  --aot \
  --prod \
  --base-href . \
  --i18n-file=src/i18n/messages.$lang.xlf \
  --i18n-format=xlf \
  --i18n-locale=$lang \
  --source-map=false
  \
done
\
cp ./src/index-non-locale.html ./dist/magic-organizer/index.html
