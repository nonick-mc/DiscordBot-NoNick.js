const fs = require('fs');
const discord = require('discord.js');
const setting_module = require('../../../../modules/setting');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
* @param {...any} [args]
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'} type
*/

module.exports = {
    /**@type {discord.ApplicationCommandData|ContextMenuData} */
    data: {customid: 'setting-welcome', type: 'BUTTON'},
    /**@type {InteractionCallback} */
    exec: async (interaction, client) => {
        const { welcome } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
        const embed = interaction.message.embeds[0];
        const select = interaction.message.components[0];
        const button = interaction.message.components[1];

        if (welcome) {
            setting_module.change_setting("welcome", false);
            embed.spliceFields(0, 1, {name: '入退室ログ', value: discord.Formatters.formatEmoji('758380151238033419')+' 無効化中', inline:true});
            button.components[1].setLabel('OFF');
            button.components[1].setStyle('DANGER');
        } else {
            setting_module.change_setting("welcome", true);
            embed.spliceFields(0, 1, {name: '入退室ログ', value: discord.Formatters.formatEmoji('758380151544217670')+' 有効化中', inline:true});
            button.components[1].setLabel('ON');
            button.components[1].setStyle('SUCCESS');
        }

        interaction.update({embeds: [embed], components: [select, button], ephemeral:true});
    }
}