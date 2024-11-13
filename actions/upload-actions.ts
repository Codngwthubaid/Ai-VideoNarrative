"use server"
import { OpenAI } from 'openai';
const apiKey: string | undefined = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("API key is not defined.");
}

const openai = new OpenAI({
    apiKey: apiKey
});

// You can now use the openai instance to make API calls
export async function transcribeUploadFile(
    response: {
        serverData: { userID: string, file: any }
    }[]
) {
    if (!response) {
        return {
            success: false,
            message: "File upload fail",
            data: null
        }
    }

    const {
        serverData: {
            userID,
            file: {
                url: fileUrl,
                name: fileName
            }
        }
    } = response[0]

    if (!fileUrl || !fileName) {
        return {
            success: false,
            message: "Fail upload file",
            data: null
        }
    }

    const fileURL = await fetch(fileUrl)

    try {
        const transcriptions = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: fileURL
        })

        console.log({ transcriptions });
        return {
            success: true,
            message: "File successfully uploaded",
            data: { transcriptions, userID }
        }
    } catch (error) {
        console.log("Error processing file ", error);

        if (error instanceof OpenAI.APIError && error.status === 413) {
            return {
                success: false,
                message: "File size exceeds the max limit of 20MB",
                data: null
            }
        }

        return {
            success: false,
            message: error instanceof Error ? error.message : "Error processing file",
            data: null
        }

    }
}

export async function generateBlogPostAction(
    { transcriptions, userID }
        : {
            transcriptions: { text: string };
            userID: string
        }
) {
    if (transcriptions) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Write a haiku about recursion in programming.",
                },
            ],
        });

        console.log(completion.choices[0].message);
    }
}