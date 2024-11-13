"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/utils/uploadthing";

const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid File" })
        .refine((file) => file.size <= 20 * 1024 * 1024, "File size must not exceed 20MB")
        .refine((file) => file.type.startsWith("audio/") || file.type.startsWith("video/"), "File must be an audio or a video file")
})

export default function UploadFunc() {
    const { toast } = useToast()
    const [file, setFile] = useState<File | null>(null)
    const { startUpload } = useUploadThing("VideoORAudioUploader", {
        onClientUploadComplete: () => {
            toast({ title: "Uploaded successfully!" });
        },
        onUploadError: () => {
            alert("Error occurred while uploading");
        },
        onUploadBegin: () => {
            toast({ title: "Upload has begun!" });
        },
    },)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    const handleTranscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!file) {
            toast({
                title: "No file selected",
                variant: "destructive",
                description: "Please select a file to transcribe",
            })
            return
        }

        try {
            const validatedFields = schema.parse({ file })
            console.log("File details:", {
                name: validatedFields.file.name,
                size: validatedFields.file.size,
                type: validatedFields.file.type
            })
            // Proceed with transcription here
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast({
                    title: "Validation error",
                    variant: "destructive",
                    description: error.errors[0]?.message || "Invalid file",
                })
            }
        }

        if (file) {
            const response = await startUpload([file])
            console.log({ response });

            if (!file) {
                toast({
                    title: "Something went wrong",
                    variant: "destructive",
                    description: "Please use a different file",
                })
            }
            toast({
                title: "Transcription is in progress ...",
                description: " Converting audio to text for better accessibility and accurate documentation of information."
            })
            
            const result = await transcribeUploadFile(response)
            console.log(result);

        }
    }

    return (
        <form onSubmit={handleTranscribe}>
            <div className="flex w-full max-w-sm items-center gap-1.5">
                <Input id="file" type="file" onChange={handleFileChange} accept="audio/*,video/*" required />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Transcribe</Button>
            </div>
        </form>
    )
}