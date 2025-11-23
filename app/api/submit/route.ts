import { google } from "googleapis"
import { NextResponse } from "next/server"
import { sendTelegramLog } from "@/lib/telegram"

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
      console.error("Missing environment variables for Google Sheets")
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

    // Send notification after successful submission using the new logger
    const tiktokMessage = tiktok ? `\n*TikTok:* 
${tiktok}
` : ""
    let notificationMessage = `🛹 *Novo vídeo para narração!* 🛹\n\n*Nome:* 
${name}
*Idade:* 
${idade}
*Instagram:* 
${instagram}${tiktokMessage}*Base:* 
${stance}
*Local:* 
${address}\n\n*Link:* [Abrir Vídeo](${link})`

    if (guardianName) {
      notificationMessage += `\n\n--- _Dados do Responsável_ ---
*Nome:* 
${guardianName}
*Celular:* 
${guardianPhone}`
    }
    
    await sendTelegramLog(notificationMessage)

    return NextResponse.json({ success: true, message: "Video submission recorded successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    console.error("Error in POST /api/submit:", errorMessage)
    
    // Also send an error log to Telegram
    await sendTelegramLog(`🔥 *Erro na API /api/submit* 🔥\n\nOcorreu um erro ao processar uma submissão.\n\n*Detalhe:* 
${errorMessage}`)

    return NextResponse.json({ error: "Failed to submit video" }, { status: 500 })
  }
}
