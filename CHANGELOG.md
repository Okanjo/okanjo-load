
# Okanjo basic product load / importer

When stuff changes, it's described here.

# v0.2.0

## 2015-07-30
 * Updated default config to default to email login method

## 2015-03-14
* Bumped version to 0.2.0
* Migrated everything to use okanjo-nodejs v0.2.0
* Moved index.js to marketplace/index.js
* Added ads/index.js for loading products into Okanjo Ads
* Updated docs


# v0.1.0

## 2014-05-29
 * Added ability to handle image URLs by downloading them first then uploading to Okanjo
 * Changed example dir into image cache dir for downloads
 * Added sanitize-filename dependency to make sure remote paths are file safe
 * Added path/platform portability via path.join instead of fixed unix path separators

## 2014-05-28
 * Initial import / setup