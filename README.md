# mastodon-i18n
Korean Hangul-Hanja mixed script (韓國語 國漢文混用) localization for mastodon

## scripts
Updating locale file(s) on new version release
1. diff.js
2. (Convert words in the generated diff file)
3. apply.js
4. update.js

## example
node scripts/apply.js i18n/vanilla/v4.0.2/ko.yml i18n/diff/v3.5.3-v4.0.2/ko.yml i18n/temp/ko.yml

node scripts/update.js i18n/custom/v3.5.3/ko-Kore.yml i18n/temp/ko.yml i18n/merged/ko-Kore.yml
