rm -r function.zip
zip -r function.zip .
aws lambda update-function-code --function-name listProducts --zip-file fileb://function.zip