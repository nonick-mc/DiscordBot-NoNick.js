const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Formatters } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionrole')
		.setDescription('リアクションロール')
        .setDefaultPermission(false),
    async execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
            const embed = new MessageEmbed()
                .setColor('#E84136')
                .setDescription('**あなたにはこのコマンドを使用する権限がありません！**\n必要な権限: サーバー管理');
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        }

        const embed = new MessageEmbed()
            .setTitle('役職付与')
            .setDescription('**ここでは誰でも付けることができる役職を付与することができます!**\n自分にあった役職を付与して自分を表現しよう!' + Formatters.codeBlock('markdown','注意:既に役職が付与されている状態でリアクションを追加すると役職付与を解除します!'))
            .setColor('BLUE');
        const button = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('mentionok')
            .setEmoji('966719258430160986')
            .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('hive')
            .setEmoji('966718111543873627')
            .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('cubecraft')
            .setEmoji('966718322857099305')
            .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('galaxite')
            .setEmoji('966718322412511292')
            .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('hypixel')
            .setEmoji('958631475220193280')
            .setStyle('SECONDARY')
        )
        interaction.channel.send({embeds:[embed], components:[button]});
    }
}