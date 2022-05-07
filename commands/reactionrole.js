const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, Formatters, MessageSelectMenu } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionrole')
		.setDescription('リアクションロール'),
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
            .setDescription('ここでは誰でも付けることができるロールを付与することができます!\n**自分にあったロールを付与して自分を表現しよう!**\n下のセレクトメニューから選択ができます!' + Formatters.codeBlock('セレクトメニューの選択が解除されると、それにあったロールも外されます!'))
            .setColor('BLUE');
        const select = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('nobot-reactionrole')
                .setMinValues(0)
                .setMaxValues(5)
                .addOptions([
                    {label: 'Mention', value: '743446391820648568', description: '主にお知らせに関する通知を受け取れます。', emoji: '966719258430160986', },
                    {label: 'Hive', value: '827401010556305509', emoji: '636200239401009162'},
                    {label: 'Cubecraft', value: '914926676738199642', emoji: '717326390072049824'},
                    {label: 'Galaxite', value: '827401048234786856', emoji: '966718322412511292'},
                    {label: 'Hypixel', value: '914926610728243220', emoji: '958631475220193280'}
                ])
        )
        interaction.reply({embeds: [embed], components: [select]});
    }
}