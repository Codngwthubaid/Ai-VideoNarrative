import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from '@clerk/nextjs/server'
 
const f = createUploadthing();
 
export const ourFileRouter = {
  VideoORAudioUploader: f({ video: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {

        const user = await currentUser()
 
      if (!user) throw new UploadThingError("Unauthorized");
 
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.userId , file};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;