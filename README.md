# Terraform to Discord Notification System

This project is a Next.js application designed to receive webhook notifications from Terraform Cloud and forward these notifications as richly formatted messages to a Discord channel. It enables real-time updates on Terraform run statuses directly in your preferred Discord server, facilitating better tracking and collaboration for your infrastructure as code (IaC) operations.

## Features

- Receives webhook notifications from Terraform Cloud.
- Sends richly formatted messages to Discord, including run status, workspace information, and more.
- Configurable to support different environments or Discord channels.

## Prerequisites

- Node.js (LTS version recommended)
- A Discord server with permissions to create webhooks

## Setup Instructions

### 1. Clone the Repository

```
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
`npm install`

### 3. Configure Environment Variables
Create a .env.local file in the project root with the following content:

`DISCORD_WEBHOOK_URL=<your_discord_webhook_url>`
Replace <your_discord_webhook_url> with the actual webhook URL from your Discord server.

### 4. Run the Development Server
```
npm run dev
The server will start, typically on http://localhost:3000, ready to receive Terraform webhook notifications.
```

## Deployment

For production, deploy the application on a platform like Vercel:

1. Push the project to a Git repository.
2. Connect the repository to Vercel.
3. Configure environment variables on Vercel as specified in the .env.local file.
4. Deploy the application via Vercel's dashboard.

## Usage

Configure your Terraform Cloud workspace to send webhook notifications to the /api/webhook endpoint of your deployed application. This setup will ensure that updates to your Terraform runs are automatically posted to your Discord channel.

## Customizing Message Formatting

Edit the message formatting logic in handler function within the /api/webhook.js file to include additional information or modify the existing layout of Discord messages.

## Contributing

Contributions to improve the project are welcome. Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is released under the MIT License. See the LICENSE file for more details.