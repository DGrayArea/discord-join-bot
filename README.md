# Discord Join Logger Bot

A Discord bot built with **discord.js v14** that listens for new members joining any server it's in and forwards a rich embed — containing their username, user ID, avatar, account age, join timestamp, and more — to your personal server via a **Discord Webhook**.

---

## 📋 What It Logs

When someone joins a monitored server, this embed is posted to your personal server:

| Field | Details |
|---|---|
| 👤 Username | Their Discord username |
| 🪪 User ID | Unique Discord snowflake ID |
| 🤖 Bot? | Whether the account is a bot |
| 🖥️ Server | Name + ID of the server they joined |
| 📅 Account Created | Date + how many days old the account is |
| 🚪 Joined Server | Exact datetime they joined |
| 🔗 Mention | Clickable `@mention` |
| 🧩 Member Count | Total server member count after join |

---

## 🚀 Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd discord-join-bot
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Open `.env` and fill in two values:

```
BOT_TOKEN=your_bot_token_here
WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### 3. Get Your Bot Token

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application** → name it → create
3. Go to **Bot** tab → click **Reset Token** → copy it → paste as `BOT_TOKEN`
4. Under **Privileged Gateway Intents**, enable **Server Members Intent** ✅
5. Go to **OAuth2 → URL Generator**:
   - Scopes: `bot`
   - Bot Permissions: `View Channels` (minimum)
   - Copy the generated URL and open it to invite the bot to your **monitored server**

### 4. Create a Webhook in Your Personal Server

1. Open Discord → right-click the **channel** in your personal server where you want logs
2. **Edit Channel** → **Integrations** → **Webhooks** → **New Webhook**
3. Name it (e.g. `Join Logs`), copy the **Webhook URL** → paste as `WEBHOOK_URL`

### 5. Run the Bot

```bash
npm start
```

You should see:
```
✅  Logged in as YourBot#0000
📡  Monitoring 1 server(s) for new joins.
```

---

## 📁 Project Structure

```
discord-join-bot/
├── src/
│   ├── index.js                  # Entry point, client setup
│   ├── events/
│   │   └── guildMemberAdd.js     # Fires on every new join
│   └── utils/
│       └── embed.js              # Builds the rich embed
├── .env.example                  # Template for secrets
├── .gitignore
├── package.json
└── README.md
```

---

## ⚠️ Notes

- The bot needs **Server Members Intent** enabled (both in Developer Portal and in code) to receive `guildMemberAdd` events.
- Only invite the bot to servers you **own or have permission to monitor**.
- Never share your `.env` file or commit it to version control.
