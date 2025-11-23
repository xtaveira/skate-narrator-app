import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, idade, address, instagram, tiktok, stance, link, guardianName, guardianPhone } = body

    // Basic validation
    if (!name || !idade || !address || !instagram || !stance || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Conditional validation for underage
    if (Number(idade) < 18 && (!guardianName || !guardianPhone)) {
      return NextResponse.json({ error: "Guardian details are required for minors" }, { status: 400 })
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
    const values = [[
      timestamp,
      name,
      address,
      instagram,
      tiktok || "",
      stance,
      idade,
      link,
      guardianName || "",
      guardianPhone || ""
    ]]

    // Append the row to the spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:J", // Updated range
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    // Send notification after successful submission
    try {
      let notificationMessage = `🛹 Novo vídeo para narração!\n\nNome: ${name}\nIdade: ${idade}\nInstagram: ${instagram}\nTikTok: ${tiktok || "Não informado"}\nBase: ${stance}\nLocal: ${address}\nLink: ${link}`;

      if (guardianName) {
        notificationMessage += `\n\n--- Dados do Responsável ---\nNome: ${guardianName}\nCelular: ${guardianPhone}`;
      }

      const apiUrl = process.env.API_URL;
      const apiKey = process.env.API_KEY;
      const chatId = process.env.CHAT_ID;

      if (apiUrl && apiKey && chatId) {
        await fetch(`${apiUrl}/send_message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: notificationMessage,
          }),
        });
      }
    } catch (notificationError) {
      console.error("Failed to send notification:", notificationError);
      // Do not block the main response if notification fails
    }

    return NextResponse.json({ success: true, message: "Video submission recorded successfully" });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error)
    return NextResponse.json({ error: "Failed to submit video" }, { status: 500 })
  }
}