import axios from 'axios';
const DISCORD_WEBHOOK_URL = 'YourDiscordWebhookHere'

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    const { run_status, run_message, run_url, run_id, workspace_name } = req.body;

    const title = `Workspace ${workspace_name}: Terraform Run Status - ${
      run_status || "(null)"
    }`;
    const description = run_message || "(null)";
    const color = getColor(run_status);

    const discordMessage = {
      content: null,
      embeds: [
        {
          title,
          description,
          url: run_url || "https://example.com",
          color,
          fields: [
            { name: "Run ID", value: run_id || "(null)", inline: true },
            {
              name: "Workspace Name",
              value: workspace_name || "(null)",
              inline: true,
            },
            { name: "Message", value: run_message || "(null)", inline: true },
            {
              name: "URL",
              value: run_url || "https://example.com",
              inline: true,
            },
          ],
          footer: { text: "Terraform Notification System" },
        },
      ],
    };

    try {
      await axios.post(DISCORD_WEBHOOK_URL, discordMessage, {
        headers: { "Content-Type": "application/json" },
      });
      res.status(200).json({ message: "Notification sent successfully." });
    } catch (error) {
      console.error("Error sending notification to Discord:", error);
      res.status(500).json({ error: "Failed to send notification." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getColor(runStatus) {
  switch (runStatus) {
    case "success":
      return 0x00ff00;
    case "failure":
      return 0xff0000;
    default:
      return 0x3b6bed;
  }
}
