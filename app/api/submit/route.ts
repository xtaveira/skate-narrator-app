import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, idade, address, instagram, tiktok, stance, link } = body

    // Validate required fields
    if (!name || !idade || !address || !instagram || !stance || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ... (env var and auth setup remains the same) ...

    // Prepare the row data
    const timestamp = new Date().toISOString()
    const values = [[timestamp, name, address, instagram, tiktok || "", stance, idade, link]]

    // Append the row to the spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:H", // Adjust sheet name if needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    // Send notification after successful submission
    try {
      const notificationMessage = `🛹 Novo vídeo para narração!\n\nNome: ${name}\nIdade: ${idade}\nInstagram: ${instagram}\nTikTok: ${tiktok || "Não informado"}\nBase: ${stance}\nLocal: ${address}\nLink: ${link}`;

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
