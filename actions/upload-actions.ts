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
                { role: "system", content: "You are a skill content writer that convets sudio transcriptions into well-structure, engaging blog posts in Markdown format. Create a comprehensive blog post with a catcny title, Introduction main body with multipe sections and a conclusion. Analyed the user's writing from their previous post and emukale their tone and style in the new post, Keep the causal and professional" },
                {
                    role: "user",
                    content: `Here are some of my previous blog posts for reference: 
Please convert the following transcription into a well-structured blog post using Markdown formatting. Follow this structure:

1. Start with a SEO friendly catchy title on the first line.
2. Add two newlines after the title.
3. Write an engaging introduction paragraph.
4. Create multiple sections for the main content, using appropriate headings (##, ###).
5. Include relevant subheadings within sections if needed.
6. Use bullet points or numbered lists where appropriate.
7. Add a conclusion paragraph at the end.
8. Ensure the content is informative, well-organized, and easy to read.
9. Emulate my writing style, tone, and any recurring patterns you notice from my previous posts.

Here's the transcription to convert: ${transcriptions}`,
                },
            ],
        });

        console.log(completion.choices[0].message);
    }
}