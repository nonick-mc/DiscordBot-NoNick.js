const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcome')
		.setDescription('新規ユーザー向けにWelcomeテンプレートを表示'),
    async execute(interaction) {
        if (!interaction.member.permissions.has("MODERATE_MEMBERS")) {
            const embed = new MessageEmbed()
                .setColor('#E84136')
                .setDescription('あなたにはこのコマンドを使用する権限がありません！');
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        const embed = new MessageEmbed()
            .setTitle('NoNICK SERVERへようこそ!')
            .setDescription(`**1.** <#959549688179204107>と<#832868870230245386>を読んでサーバーについて理解しよう!
            **2.** <#723525324880609349>で簡単な自己紹介をしよう! 初回ならSNS等を宣伝してもOK!
            **3.** <#831017020098215987>で自分にあった役職を追加してみよう!
            これからよろしくお願いします! <a:a89_Nonickhead:974157452016766986>`)
            .setColor('GREEN')
            .setFooter({name: "わからないことがあったらいつでも質問してください!"})
        interaction.reply({embeds: [embed]});
    }
}