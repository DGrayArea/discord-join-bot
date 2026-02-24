const { EmbedBuilder, time, TimestampStyles } = require('discord.js');

/**
 * Builds a rich Discord embed with all key details of the new member.
 *
 * @param {import('discord.js').GuildMember} member
 * @returns {EmbedBuilder}
 */
function buildEmbed(member) {
  const { user, guild } = member;

  const joinedAt = member.joinedAt ?? new Date();
  const createdAt = user.createdAt;

  // Calculate account age in days
  const accountAgeDays = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const avatarURL =
    user.displayAvatarURL({ size: 256, extension: 'png' }) ??
    `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;

  return new EmbedBuilder()
    .setColor(0x57f287) // Discord green
    .setTitle('📥  New Member Joined')
    .setThumbnail(avatarURL)
    .addFields(
      {
        name: '👤  Username',
        value: `\`${user.username}\``,
        inline: true,
      },
      {
        name: '🪪  User ID',
        value: `\`${user.id}\``,
        inline: true,
      },
      {
        name: '🤖  Bot?',
        value: user.bot ? '✅ Yes' : '❌ No',
        inline: true,
      },
      {
        name: '🖥️  Server',
        value: `**${guild.name}** (\`${guild.id}\`)`,
        inline: false,
      },
      {
        name: '📅  Account Created',
        value: `${time(createdAt, TimestampStyles.LongDate)} (${accountAgeDays} days old)`,
        inline: false,
      },
      {
        name: '🚪  Joined Server',
        value: time(joinedAt, TimestampStyles.LongDateTime),
        inline: false,
      },
      {
        name: '🔗  Mention',
        value: `<@${user.id}>`,
        inline: true,
      },
      {
        name: '🧩  Server Member Count',
        value: `${guild.memberCount.toLocaleString()} members`,
        inline: true,
      }
    )
    .setFooter({
      text: `Account age: ${accountAgeDays} day${accountAgeDays !== 1 ? 's' : ''}`,
      iconURL: avatarURL,
    })
    .setTimestamp();
}

module.exports = buildEmbed;
