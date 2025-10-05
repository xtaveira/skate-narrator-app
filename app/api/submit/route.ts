import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, address, instagram, stance, link } = body

    // Validate required fields
    if (!name || !address || !instagram || !stance || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get environment variables
    const spreadsheetId = process.env.SPREADSHEET_ID
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error("Missing environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Setup Google Sheets API authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Prepare the row data
    const timestamp = new Date().toISOString()
    const values = [[timestamp, name, address, instagram, stance, link]]

    // Append the row to the spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F", // Adjust sheet name if needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return NextResponse.json({ success: true, message: "Video submission recorded successfully" })
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error)
    return NextResponse.json({ error: "Failed to submit video" }, { status: 500 })
  }
}
