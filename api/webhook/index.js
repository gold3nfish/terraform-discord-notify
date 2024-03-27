import axios from 'axios';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1205053645511458816/aen6HpmJZ5sIWAlN5hk6yrp3vHPzJ9P6UkIB3GFncee2YNjLXVP3AyslypOidU2dPUE2';

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const {
      run_url,
      run_id,
      run_message,
      workspace_name,
      notifications,
    } = req.body;

    const run_status = notifications.length > 0 ? notifications[0].run_status : "(null)";
    const message = run_message || "(null)";

    const title = `Workspace ${workspace_name}`;
    const description = `${message}\n`;
    const color = getColor(run_status);

    const discordMessage = {
      content: null,
      embeds: [
        {
          title,
          description,
          url: run_url,
          color,
          fields: [
            { name: "Run ID", value: run_id, inline: true },
            { name: "Workspace Name", value: workspace_name, inline: true },
            { name: "URL", value: run_url, inline: true },
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
    case "planned_and_finished":
      return 0x00ff00;
    case "applied":
      return 0x00ff00;
    case "errored":
      return 0xff0000;
    default:
      return 0x3b6bed;
  }
}
