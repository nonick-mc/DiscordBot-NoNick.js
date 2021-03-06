const discord = require('discord.js');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
* @param {discord.Client} client
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'} type
*/

module.exports = {
    /** @type {discord.ApplicationCommandData|ContextMenuData} */
    data: { customid: 'setting-back', type: 'BUTTON' },
    /** @type {InteractionCallback} */
    exec: async (interaction) => {
        const embed = new discord.MessageEmbed()
            .setTitle('ð  NoNICK.js - è¨­å®')
            .setDescription('NoNICK.jsã®ã³ã³ãã­ã¼ã«ããã«ã¸ãããã!\nããã§ã¯ãã®BOTã®è¨­å®ãå¤æ´ãããã¨ãã§ãã¾ã!' + discord.Formatters.codeBlock('markdown', 'ã»ã¬ã¯ãã¡ãã¥ã¼ããé²è¦§ã»å¤æ´ãããè¨­å®ãé¸æããã!'))
            .setColor('GREEN');
        const button = new discord.MessageActionRow().addComponents(
            new discord.MessageButton()
                .setCustomId('setting-whatsnew')
                .setLabel('What\'s New')
                .setEmoji('966588719643631666')
                .setStyle('PRIMARY'),
            new discord.MessageButton()
                .setCustomId('setting-laungage')
                .setEmoji('ð')
                .setStyle('SECONDARY'),
        );
        const select = new discord.MessageActionRow().addComponents(
            new discord.MessageSelectMenu()
                .setCustomId('setting-select')
                .setPlaceholder('ããããé¸æ')
                .addOptions([
                    { label: 'å¥éå®¤ã­ã°', value: 'setting-welcomemessage', emoji: 'ðª' },
                    { label: 'éå ±æ©è½', value: 'setting-report', emoji: 'ð¢' },
                    { label: 'ãªã³ã¯å±é', value: 'setting-linkOpen', emoji: 'ð' },
                    { label: '/music ã³ãã³ã', value: 'setting-music', emoji: '966596708484149289' },
                    { label: '/timeout ã³ãã³ã', value: 'setting-timeout', emoji: '966596708484149289' },
                    { label: '/ban ã³ãã³ã', value: 'setting-ban', emoji: '966596708484149289' },
                ]),
        );
        interaction.update({ embeds: [embed], components: [select, button], ephemeral: true });
    },
};