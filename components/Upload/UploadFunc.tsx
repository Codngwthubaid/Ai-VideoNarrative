// "use client"
// import { Input } from "@/components/ui/input"
// import { Button } from "../ui/button"
// import { z } from "zod"
// import { useToast } from "@/hooks/use-toast"
// import { useUploadThing } from "@/utils/uploadthing"


// const schema = z.object({
//     file: z
//         .instanceof(File, { message: "Invalid File" })
//         .refine((file) => file.size <= 20 * 1024 * 1024, "File size must not be exceed by 20MB")
//         .refine((file) => file.type.startsWith("audio/") || file.type.startsWith("video/"), "File must be an audio or a video file")
// })

// export default function UploadFunc() {

//     const { toast } = useToast()
//     const { startUpload } = useUploadThing("videoORAudioUploader", {
//         onClientUploadComplete: () => {
//             toast({ title: "Uploaded Successfully ..." });
//         },
//         onUploadError: () => {
//             alert("Error occurred while uploading");
//         },
//         onUploadBegin: () => {
//             alert("Upload has begun");
//         }
//     })

//     const handleTranscribe = async (formdata: FormData) => {
//         const file = formdata.get("file") as File
//         const validatedFields = schema.safeParse({ file })
//         if (!validatedFields.success) {
//             console.log("validatedFields", validatedFields.error.flatten().fieldErrors);
//             toast({
//                 title: "Something went wrong",
//                 variant: "destructive",
//                 description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
//             })
//         }

//         if (file) {
//             const response = await startUpload([file])
//             console.log({ response });
//         }
//     }

//     return (
//         <form action={handleTranscribe}>
//             <div className="flex w-full max-w-sm items-center gap-1.5">
//                 <Input id="file" type="file" accept="audio/*,video/*" required />
//                 <Button className="bg-purple-600 hover:bg-purple-700">Transcribe</Button>
//             </div>
//         </form>
//     )
// }


'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/utils/uploadthing"

const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid File" })
        .refine((file) => file.size <= 20 * 1024 * 1024, "File size must not exceed 20MB")
        .refine((file) => file.type.startsWith("audio/") || file.type.startsWith("video/"), "File must be an audio or a video file")
})

export default function UploadFunc() {
    const [file, setFile] = useState<File | null>(null)
    const { toast } = useToast()
    const { startUpload } = useUploadThing("videoORAudioUploader", {
        onClientUploadComplete: () => {
            toast({ title: "Uploaded Successfully ..." })
        },
        onUploadError: () => {
            toast({ title: "Error occurred while uploading", variant: "destructive" })
        },
        onUploadBegin: () => {
            toast({ title: "Upload has begun" })
        }
    })

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
            })
            return
        }

        const validatedFields = schema.safeParse({ file })

        if (!validatedFields.success) {
            console.log("Validation errors:", validatedFields.error.flatten().fieldErrors)
            toast({
                title: "Invalid file",
                variant: "destructive",
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
            })
            return
        }

        try {
            const response = await startUpload([file])
            console.log("Upload response:", response)
        } catch (error) {
            console.error("Upload error:", error)
            toast({
                title: "Upload failed",
                variant: "destructive",
                description: "An error occurred during the upload process.",
            })
        }
    }

    return (
        <form onSubmit={handleTranscribe}>
            <div className="flex w-full max-w-sm items-center gap-1.5">
                <Input
                    id="file"
                    type="file"
                    accept="audio/*,video/*"
                    required
                    onChange={handleFileChange}
                />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Transcribe
                </Button>
            </div>
        </form>
    )
}




// "use client"
// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { z } from "zod"
// import { useToast } from "@/hooks/use-toast"
// import { useUploadThing } from "@/utils/uploadthing";

// const schema = z.object({
//     file: z
//         .instanceof(File, { message: "Invalid File" })
//         .refine((file) => file.size <= 20 * 1024 * 1024, "File size must not exceed 20MB")
//         .refine(
//             (file) => file.type.startsWith("audio/") || file.type.startsWith("video/"),
//             "File must be an audio or a video file"
//         )
// })

// export default function UploadFunc() {
//     const { toast } = useToast()
//     const [file, setFile] = useState<File | null>(null)
//     const { startUpload } = useUploadThing("videoORAudioUploader", {
//         onClientUploadComplete: () => {
//             toast({ title: "Upload Successfully ..." })
//         },
//         onUploadError: () => {
//             toast({ title: "Error occurred while uploading" });
//         },
//         onUploadBegin: () => {
//             toast({ title: "Upload has begun" });
//         },
//     },)



//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setFile(event.target.files[0])
//         }
//     }

//     const handleTranscribe = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()

//         if (!file) {
//             toast({
//                 title: "No file selected",
//                 variant: "destructive",
//                 description: "Please select a file to transcribe.",
//             })
//             return
//         }

//         const validatedFields = schema.safeParse({ file })

//         if (!validatedFields.success) {
//             console.log("validatedFields", validatedFields.error.flatten().fieldErrors)
//             toast({
//                 title: "Something went wrong",
//                 variant: "destructive",
//                 description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
//             })
//         } else {
//             // File is valid, proceed with transcription
//             console.log("File is valid, proceeding with transcription")
//             // Add your transcription logic here
//         }

//         if (file) {
//             const response = await startUpload([file])
//             console.log(response);
//         }
//     }

//     return (
//         <form onSubmit={handleTranscribe}>
//             <div className="flex w-full max-w-sm items-center gap-1.5">
//                 <Input
//                     id="file"
//                     name="file"
//                     type="file"
//                     accept="audio/*,video/*"
//                     onChange={handleFileChange}
//                     required
//                 />
//                 <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
//                     Transcribe
//                 </Button>
//             </div>
//         </form>
//     )
// }