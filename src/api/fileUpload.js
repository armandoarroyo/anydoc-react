import React, { useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { UploadDocument } from "./localServices";
import {
  CognitoIdentityClient,
  CreateIdentityPoolCommand,
} from "@aws-sdk/client-cognito-identity";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

// Initialize the Amazon Cognito credentials provider

export async function FileUpload(file, fileTypeId, fileType) {
  const S3_BUCKET = sessionStorage.bucketName;
  const REGION = "us-east-1";
  // Initialize the Amazon Cognito credentials provider
  const s3 = new S3Client({
    region: "us-west-1",
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      identityPoolId: sessionStorage.identityPoolId, // IDENTITY_POOL_ID
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_LnlfnGvTM":
          sessionStorage.token,
      },
    }),
  });

  const fileName1 = file.name.split(".");
  const fileName = fileName1[0] + new Date().getTime() + "." + fileName1[1];

  const uploadParams = {
    Bucket: S3_BUCKET,
    // + "/" + sessionStorage.company + "/" + fileType,
    Key: sessionStorage.company + "/" + fileType + "/" + fileName,
    Body: file,
    ACL: "bucket-owner-full-control",
  };

  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Successfully uploaded photo.");
    UploadDocument(fileName, fileType, fileTypeId);
    return true;
  } catch (err) {
    console.log("There was an error uploading your photo: ", err.message);
    return false;
  }
}

/*
import React, { useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { UploadDocument } from "./localServices";
const authApiUrl =
  "https://pad2zt6ubf.execute-api.us-east-1.amazonaws.com/Prod";

const S3_BUCKET = sessionStorage.bucketName;
const REGION = "us-east-1";

export async function FileUpload(file, fileTypeId, fileType) {
  const fileName1 = file.name.split(".");
  const fileName = fileName1[0] + new Date().getTime() + "." + fileName1[1];
  let rest;

  AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: sessionStorage.identityPoolId,
      Logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_LnlfnGvTM":
          sessionStorage.token,
      },
    }),
  });

  var s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    apiVersion: "2006-03-01",
  });

  s3.upload(
    {
      Bucket: S3_BUCKET + "/" + sessionStorage.company + "/" + fileType,
      Key: fileName,
      Body: file,
      ACL: "bucket-owner-full-control",
    },
    function (err, data) {
      if (err) {
        console.log("uploading failed: " + file.name);
        return err;
      } else {
        console.log("daata " + data);
        console.log("Successfully upload:" + file.name);
        UploadDocument(fileName, fileType, fileTypeId);
        return data;
      }
    }
  );
}
*/
