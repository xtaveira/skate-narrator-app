/**
 * Sends a log message to a specified Telegram chat.
 * This function is designed to fail silently and not interrupt the application flow.
 *
 * @param message The message string to be sent. Supports Markdown formatting.
 */
export async function sendTelegramLog(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error("Telegram environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) are not set. Skipping log.")
    return
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Failed to send Telegram log:", errorData.description)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to send Telegram log:", error.message)
    } else {
      console.error("An unknown error occurred while sending Telegram log.")
    }
  }
}
