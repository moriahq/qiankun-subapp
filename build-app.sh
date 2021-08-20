yarn && yarn build
rm -rf build.zip
zip -r build.zip iscan manifest.yml
