"use server"

import { date } from "zod"

async function transcribeUploadFile(
    response: {
        serverData: { userID: string, file: File }
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
    // const userID = response[0].serverData.userID
    // const file = response[0].serverData.userID

    if (!fileUrl || !fileName) {
        return {
            success: false,
            message: "Fail upload file",
            data: null
        }
    }

}