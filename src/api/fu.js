import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.
import { path } from "path";
import { fs } from "fs";

function Fu(file, fileTypeId, fileType) {
  const filere = file;
  const fileStream = fs.createReadStream(filere);
  const uploadParams = {
    Bucket: "BUCKET_NAME",
    // Add the required 'Key' parameter using the 'path' module.
    Key: path.basename(file),
    // Add the required 'Body' parameter
    Body: fileStream,
  };
  const run = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };

  return run();
}

export default Fu;
// Set the parameters

// Upload file to specified bucket.
