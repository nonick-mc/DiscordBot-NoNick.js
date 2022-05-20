const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('押すなよ？絶対に押すなよ？'),
    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `**デバッグ:** <@${interaction.member.id}>のNoBOTレベルの**初期化**に成功しました。`, ephemeral: true});
        }
        process.end();
    }
}