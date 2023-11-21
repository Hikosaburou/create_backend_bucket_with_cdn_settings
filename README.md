# create_backend_bucket_with_cdn_settings

googleapis を使ってBackend Bucketを作成し、Cloud CDNを設定するサンプル

# Usage

事前にCloud Storageのバケットを作成しておく。

```
npx ts-node src/index.ts --bucket=<YOUR_BUCKET_NAME> --project=<YOUR_GOOGLE_CLOUD_PROJECT_ID>
```
