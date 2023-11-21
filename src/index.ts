import { google } from "googleapis";
import { program } from "commander";

program
  .option("--bucket <bucket>", "Bucket name")
  .option("--project <project>", "GCP Project ID");
program.parse();

const googleAuthOpts = {
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
};
const auth = new google.auth.GoogleAuth(googleAuthOpts);

async function main() {
  const options = program.opts();
  const bucketName = options.bucket;
  const gcpProjectId = options.project;
  if (!bucketName) {
    throw new Error("--bucket option is required");
  }

  const computeClient = google.compute({ version: "v1", auth });

  const res = await computeClient.backendBuckets.insert({
    project: gcpProjectId,
    requestBody: {
      name: bucketName,
      bucketName: bucketName,
      enableCdn: true,
      cdnPolicy: {
        requestCoalescing: true,
        cacheMode: "CACHE_ALL_STATIC",
        defaultTtl: 3600,
        maxTtl: 3600,
        clientTtl: 0,
        negativeCaching: false,
        serveWhileStale: 0,
      },
      compressionMode: "DISABLED",
    },
  });

  console.log(JSON.stringify(res.data, null, 2));
}

(async () => {
  await main();
})();
