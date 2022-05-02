const { ApplicationCommandType } = require('discord-api-types/v10');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('このユーザーの情報')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const infoUser = interaction.targetUser
        const infoMember = await interaction.guild.members.fetch(infoUser);

        const Usertag = infoUser.tag;
        const UserName = infoUser.username;
        const UserAvater = infoUser.displayAvatarURL();
        const UserCreateTime = Math.floor(infoUser.createdTimestamp/1000);

        const MemberName = infoMember.nickname;
        const MemberAvater = infoMember.displayAvatarURL();
        const MemberJoinTime = Math.floor(infoMember.joinedTimestamp/1000);

        const embed = new discord.MessageEmbed()
            .addFields(
                {name: 'アカウント作成日', value: discord.Formatters.time(UserCreateTime), inline:true},
                {name: 'サーバー参加日', value: discord.Formatters.time(MemberJoinTime), inline:true},
            )

        if (UserAvater == MemberAvater) {
            embed.setAuthor({ name: `${Usertag}`});
            embed.setThumbnail(UserAvater);
        } else {
            embed.setAuthor({ name: `${Usertag}`, iconURL: `${UserAvater}` });
            embed.setThumbnail(MemberAvater);
        }

        if (MemberName) {
            embed.setTitle(MemberName);
        } else {
            embed.setTitle(UserName);
        }

        interaction.reply({embeds: [embed], ephemeral: true});
	}
}