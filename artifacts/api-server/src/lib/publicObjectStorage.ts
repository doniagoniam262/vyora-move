import { Storage, type File } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

function parseObjectPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const [, bucketName, ...objectParts] = normalized.split("/");
  if (!bucketName || objectParts.length === 0) {
    throw new Error("Invalid public object path");
  }
  return { bucketName, objectName: objectParts.join("/") };
}

function publicSearchPaths() {
  return (process.env.PUBLIC_OBJECT_SEARCH_PATHS ?? "")
    .split(",")
    .map((path) => path.trim())
    .filter(Boolean);
}

export async function findPublicObject(relativePath: string): Promise<File | null> {
  for (const searchPath of publicSearchPaths()) {
    const { bucketName, objectName } = parseObjectPath(`${searchPath}/${relativePath}`);
    const file = storage.bucket(bucketName).file(objectName);
    const [exists] = await file.exists();
    if (exists) return file;
  }
  return null;
}

