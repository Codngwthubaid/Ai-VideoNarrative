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
async function transcribeUploadFile(
    response: {
        serverData: { userID: string, file: any }
    }[]
) {
    if (!response) {
        return {
            success: false,
            message: "File upload fail",
            data:null
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
    } catch (error) {
        console.log(error);
        
    }
}