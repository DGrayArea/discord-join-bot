const { WebhookClient } = require('discord.js');
const buildEmbed = require('../utils/embed');

/**
 * Called every time a new member joins any server the bot is in.
 * Sends a rich embed with their details to the personal server webhook.
 *
 * @param {import('discord.js').GuildMember} member
 */
async function handleGuildMemberAdd(member) {
  const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

  const embed = buildEmbed(member);

  await webhook.send({
    username: 'Join Logger',
    avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
    embeds: [embed],
  });

  console.log(
    `📥  New join logged: ${member.user.tag} (${member.user.id}) in "${member.guild.name}"`
  );
}

module.exports = handleGuildMemberAdd;
