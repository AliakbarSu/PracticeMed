rm -r function.zip
zip -r function.zip .
aws s3 mv ./function.zip s3://mpt-lambda-functions/bookTest
