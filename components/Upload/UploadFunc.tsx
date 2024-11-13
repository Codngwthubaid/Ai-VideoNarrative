"use client"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/utils/uploadthing"


const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid File" })
        .refine((file) => file.size <= 20 * 1024 * 1024, "File size must not be exceed by 20MB")
        .refine((file) => file.type.startsWith("audio/") || file.type.startsWith("video/"), "File must be an audio or a video file")
})

export default function UploadFunc() {

    const { toast } = useToast()
    const { startUpload } = useUploadThing("videoORAudioUploader", {
        onClientUploadComplete: () => {
            toast({ title: "Uploaded Successfully ..." });
        },
        onUploadError: () => {
            alert("Error occurred while uploading");
        },
        onUploadBegin: () => {
            alert("Upload has begun");
        }
    })

    const handleTranscribe = async (formdata: FormData) => {
        const file = formdata.get("file") as File
        const validatedFields = schema.safeParse({ file })
        if (!validatedFields.success) {
            console.log("validatedFields", validatedFields.error.flatten().fieldErrors);
            toast({
                title: "Something went wrong",
                variant: "destructive",
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
            })
        }

        if (file) {
            const response = await startUpload([file])
            console.log({ response });
        }
    }

    return (
        <form action={handleTranscribe}>
            <div className="flex w-full max-w-sm items-center gap-1.5">
                <Input id="file" type="file" accept="audio/*,video/*" required />
                <Button className="bg-purple-600 hover:bg-purple-700">Transcribe</Button>
            </div>
        </form>
    )
}

