require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const handleGuildMemberAdd = require('./events/guildMemberAdd');

// ─── Validate Environment ──────────────────────────────────────────────────
if (!process.env.BOT_TOKEN) {
  console.error('❌  Missing BOT_TOKEN in your .env file.');
  process.exit(1);
}
if (!process.env.WEBHOOK_URL) {
  console.error('❌  Missing WEBHOOK_URL in your .env file.');
  process.exit(1);
}

// ─── Create Client ─────────────────────────────────────────────────────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Required to receive guildMemberAdd
  ],
});

// ─── Events ────────────────────────────────────────────────────────────────
client.once('ready', () => {
  console.log(`✅  Logged in as ${client.user.tag}`);
  console.log(`📡  Monitoring ${client.guilds.cache.size} server(s) for new joins.`);
});

client.on('guildMemberAdd', (member) => {
  handleGuildMemberAdd(member).catch((err) =>
    console.error('Error handling guildMemberAdd:', err)
  );
});

// ─── Login ─────────────────────────────────────────────────────────────────
client.login(process.env.BOT_TOKEN);
