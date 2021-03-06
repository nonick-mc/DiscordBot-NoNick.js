const discord = require('discord.js');

/**
* @callback InteractionCallback
* @param {discord.SelectMenuInteraction} interaction
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
    data: { customid: 'setting-select', type: 'SELECT_MENU' },
    /** @type {InteractionCallback} */
    exec: async (interaction, client, Configs) => {
        const config = await Configs.findOne({ where: { serverId: interaction.guild.id } });
        const button = new discord.MessageActionRow().addComponents(
            new discord.MessageButton()
            .setCustomId('setting-back')
            .setEmoji('971389898076598322')
            .setStyle('PRIMARY'),
        );

        if (interaction.values == 'setting-welcomemessage') {
            const { welcome, welcomeCh, welcomeMessage, leave, leaveCh } = config.get();
            const embed = new discord.MessageEmbed()
                .setTitle('ð  è¨­å® - å¥éå®¤ã­ã°')
                .setDescription([
                    'å¥éå®¤ã­ã°ã®è¨­å®ãä»¥ä¸ã®ãã¿ã³ããè¡ãã¾ãã',
                    discord.Formatters.codeBlock('markdown', '#å¥éå®¤ã­ã°ã¨ã¯...\nãµã¼ãã¼ã«æ°ããã¡ã³ãã¼ãåå ããæãéå®¤ããæã«éç¥ãã¦ãããæ©è½ã§ããã¡ãã»ã¼ã¸ãè¨­å®ãããã¨ã§åå ããäººã«è¦ã¦ãããããæå ±ãéä¿¡ã§ãã¾ãã'),
                    '**ãç¾å¨ã®è¨­å®ã**',
                ].join('\n'))
                .setColor('GREEN')
                .addFields(
                    { name: 'å¥å®¤ã­ã°', value: welcome ? `${discord.Formatters.formatEmoji('758380151544217670')}æå¹ (${discord.Formatters.channelMention(welcomeCh)})` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline:true },
                    { name: 'éå®¤ã­ã°', value: leave ? `${discord.Formatters.formatEmoji('758380151544217670')}æå¹ (${discord.Formatters.channelMention(leaveCh)})` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline:true },
                    { name: 'å¥å®¤ã­ã°ã¡ãã»ã¼ã¸', value: welcomeMessage || 'è¨­å®ããã¦ãã¾ãã' },
                );
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                    .setCustomId('welcomeSetting')
                    .addOptions([
                        { label: 'å¥å®¤ã­ã°', value: 'setting-welcome-1', description: 'ã¡ã³ãã¼åå æã«ã¡ãã»ã¼ã¸ãéä¿¡', emoji: '966588719635267624', default: true },
                        { label: 'éå®¤ã­ã°', value: 'setting-welcome-2', description: 'ã¡ã³ãã¼éå®¤æã«ã¡ãã»ã¼ã¸ãéä¿¡', emoji: '966588719635267624' },
                    ]),
            ]);
            button.addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-welcome')
                    .setLabel(welcome ? 'ç¡å¹å' : 'æå¹å')
                    .setStyle(welcome ? 'DANGER' : 'SUCCESS')
                    .setDisabled(welcomeCh ? false : true),
                new discord.MessageButton()
                    .setCustomId('setting-welcomeCh')
                    .setLabel('éä¿¡å')
                    .setEmoji('966588719635267624')
                    .setStyle('SECONDARY'),
                new discord.MessageButton()
                    .setCustomId('setting-welcomeMessage')
                    .setLabel('ã¡ãã»ã¼ã¸')
                    .setEmoji('966596708458983484')
                    .setStyle('SECONDARY'),
            ]);
            interaction.update({ embeds: [embed], components: [select, button], ephemeral:true });
        }

        if (interaction.values == 'setting-report') {
            const { reportCh, reportRoleMention, reportRole } = config.get();
            const embed = new discord.MessageEmbed()
                .setTitle('ð  è¨­å® - éå ±æ©è½')
                .setDescription([
                    'éå ±æ©è½ã®è¨­å®ãä»¥ä¸ã®ã»ã¬ã¯ãã¡ãã¥ã¼ããè¡ãã¾ãã',
                    '`Tips:`ã³ã³ãã­ã¹ãã¡ãã¥ã¼èªä½ã®æ©è½ãOFFã«ãããå ´åã¯ã`ãµã¼ãã¼è¨­å®âé£æºãµã¼ãã¹âNoNICK.js`ããå¤æ´ã§ãã¾ãã',
                    discord.Formatters.codeBlock('markdown', '#éå ±æ©è½ã¨ã¯...\nã¡ã³ãã¼ããµã¼ãã¼ã«ã¼ã«ç­ã«éåãã¦ããã¡ãã»ã¼ã¸ãéå ±ã§ããæ©è½ã§ããã¢ãã¬ã¼ã¿ã¼ãã¡ãã»ã¼ã¸ãç£è¦ããå¿è¦ããªããªããããéå¶ã®è² æãæ¸ããã¾ãã'),
                    '**ãç¾å¨ã®è¨­å®ã**',
                ].join('\n'))
                .setColor('GREEN')
                .addFields(
                    { name: 'éå ±ã®éä¿¡å', value: reportCh == null ? 'æå®ããã¦ãã¾ãã' : `${discord.Formatters.channelMention(reportCh)}`, inline: true },
                    { name: 'ã­ã¼ã«ã¡ã³ã·ã§ã³', value: reportRoleMention ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹ (${discord.Formatters.roleMention(reportRole)})` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline: true },
                );
            const select1 = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                .setCustomId('reportSetting')
                .setPlaceholder('ããããé¸æ')
                .addOptions([
                    { label: 'å¨è¬è¨­å®', value: 'setting-report-1', emoji: 'ð', default: true },
                    { label: 'ã­ã¼ã«ã¡ã³ã·ã§ã³æ©è½', description: 'éå ±åãåãæã«ã­ã¼ã«ãã¡ã³ã·ã§ã³', value: 'setting-report-2', emoji: '966719258430160986' },
                ]),
            ]);
            button.addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-reportCh')
                    .setLabel('éå ±ã®éä¿¡å')
                    .setStyle('SECONDARY')
                    .setEmoji('966588719635267624'),
            ]);
            interaction.update({ embeds: [embed], components: [select1, button], ephemeral:true });
        }

        if (interaction.values == 'setting-timeout') {
            const { timeoutLog, timeoutLogCh, timeoutDm } = config.get();
            const embed = new discord.MessageEmbed()
                .setTitle('ð  è¨­å® - timeoutã³ãã³ã')
                .setDescription([
                    'timeoutã³ãã³ãã®è¨­å®ãä»¥ä¸ã®ã»ã¬ã¯ãã¡ãã¥ã¼ããè¡ãã¾ãã',
                    '`Tips:`ã¹ã©ãã·ã¥ã³ãã³ãèªä½ã®æ©è½ãOFFã«ãããå ´åã¯ã`ãµã¼ãã¼è¨­å®âé£æºãµã¼ãã¹âNoNICK.js`ããå¤æ´ã§ãã¾ãã',
                    discord.Formatters.codeBlock('markdown', '#timeoutã³ãã³ãã¨ã¯...\nãµã¼ãã¼ã«ããã¡ã³ãã¼ã«ã¿ã¤ã ã¢ã¦ã(ãã¥ã¼ã)ãè¨­å®ãããã³ãã³ãã§ããå¬å¼ã®æ©è½ããç´°ããè¨­å®ããããã¨ãã§ããä¸ååä½ã§ã®èª¿æ´ãå¯è½ã§ãã'),
                    '**ãç¾å¨ã®è¨­å®ã**',
                ].join('\n'))
                .setColor('GREEN')
                .addFields(
                    { name: 'ã­ã°æ©è½', value: timeoutLog ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹ (${discord.Formatters.channelMention(timeoutLogCh)})` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline: true },
                    { name: 'DMè­¦åæ©è½', value: timeoutDm ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline: true },
                );
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                .setCustomId('timeoutSetting')
                .setPlaceholder('ããããé¸æ')
                .addOptions([
                    { label: 'ã­ã°æ©è½', description: 'ã³ãã³ãã®å®è¡ã­ã°ãéä¿¡', value: 'setting-timeout-1', emoji: '966588719635267624', default: true },
                    { label: 'DMè­¦åæ©è½', description: 'ã¿ã¤ã ã¢ã¦ããããäººã«è­¦åDMãéä¿¡', value: 'setting-timeout-2', emoji: '966588719635267624' },
                ]),
            ]);
            button.addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-timeoutLog')
                    .setLabel(timeoutLog ? 'ç¡å¹å' : 'æå¹å')
                    .setStyle(timeoutLog ? 'DANGER' : 'SUCCESS')
                    .setDisabled(timeoutLogCh ? false : true),
                new discord.MessageButton()
                    .setCustomId('setting-timeoutLogCh')
                    .setLabel('éä¿¡å')
                    .setEmoji('966588719635267624')
                    .setStyle('SECONDARY'),
            ]);
            interaction.update({ embeds: [embed], components: [select, button], ephemeral:true });
        }

        if (interaction.values == 'setting-ban') {
            const { banLog, banLogCh, banDm } = config.get();
            const embed = new discord.MessageEmbed()
                .setTitle('ð  è¨­å® - banã³ãã³ã')
                .setDescription([
                    'banã³ãã³ãã®è¨­å®ãä»¥ä¸ã®ã»ã¬ã¯ãã¡ãã¥ã¼ããè¡ãã¾ãã',
                    '`Tips:`ã¹ã©ãã·ã¥ã³ãã³ãèªä½ã®æ©è½ãOFFã«ãããå ´åã¯ã`ãµã¼ãã¼è¨­å®âé£æºãµã¼ãã¹âNoNICK.js`ããå¤æ´ã§ãã¾ãã',
                    discord.Formatters.codeBlock('markdown', '#BANã³ãã³ãã¨ã¯...\nå¬å¼ã®BANã³ãã³ããå¼·åããã³ãã³ãã§ãã\nãµã¼ãã¼ã«ããªãã¦ã¼ã¶ã¼ãIDã®ã¿ã§BANãããã¨ãã§ãã¾ããèããããã¦æãã¦ãã£ãã¡ã³ãã¼ã®è¿½å å¦åããä»ã³ãã¥ããã£ã§èãããããã¦ã¼ã¶ã¼ã®å¯¾ç­ã«æå¹ã§ãã'),
                    '**ãç¾å¨ã®è¨­å®ã**',
                ].join('\n'))
                .setColor('GREEN')
                .addFields(
                    { name: 'ã­ã°æ©è½', value: banLog ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹ (${discord.Formatters.channelMention(banLogCh)})` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline: true },
                    { name: 'DMè­¦åæ©è½', value: banDm ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹` : `${discord.Formatters.formatEmoji('758380151238033419')} ç¡å¹`, inline: true },
                );
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                .setCustomId('banSetting')
                .setPlaceholder('ããããé¸æ')
                .addOptions([
                    { label: 'ã­ã°æ©è½', description: 'ã³ãã³ãã®å®è¡ã­ã°ãéä¿¡', value: 'setting-ban-1', emoji: '966588719635267624', default:true },
                    { label: 'DMè­¦åæ©è½', description: 'BANãããäººã«è­¦åDMãéä¿¡', value: 'setting-ban-2', emoji: '966588719635267624' },
                ]),
            ]);
            button.addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-banLog')
                    .setLabel(banLog ? 'ç¡å¹å' : 'æå¹å')
                    .setStyle(banLog ? 'DANGER' : 'SUCCESS')
                    .setDisabled(banLogCh ? false : true),
                new discord.MessageButton()
                    .setCustomId('setting-banLogCh')
                    .setLabel('éä¿¡å')
                    .setEmoji('966588719635267624')
                    .setStyle('SECONDARY'),
            ]);
            interaction.update({ embeds: [embed], components: [select, button], ephemeral:true });
        }

        if (interaction.values == 'setting-linkOpen') {
            const linkOpen = config.get('linkOpen');
            const embed = new discord.MessageEmbed()
                .setTitle('ð  è¨­å® - ãªã³ã¯å±é')
                .setDescription([
                    'ãªã³ã¯å±éã®è¨­å®ãä»¥ä¸ã®ã»ã¬ã¯ãã¡ãã¥ã¼ããè¡ãã¾ãã',
                    discord.Formatters.codeBlock('markdown', '#ãªã³ã¯å±éã¨ã¯...\nDiscordã®ã¡ãã»ã¼ã¸ãªã³ã¯ãéä¿¡ããéã«ãªã³ã¯åã®ã¡ãã»ã¼ã¸ãè¡¨ç¤ºãã¦ãããæ©è½ã§ãã\næµãã¦ãã¾ã£ãã¡ãã»ã¼ã¸ãéå»ã®ã¡ãã»ã¼ã¸ããã£ããã«åºãããæã«ä¾¿å©ã§ãã'),
                    '**ãç¾å¨ã®è¨­å®ã**',
                ].join('\n'))
                .setColor('GREEN')
                .addFields({ name: 'ãªã³ã¯å±é', value: linkOpen ? `${discord.Formatters.formatEmoji('968351750014783532')}æå¹` : `${discord.Formatters.formatEmoji('758380151238033419')}ç¡å¹`, inline: true });
            const select = new discord.MessageActionRow().addComponents([
                new discord.MessageSelectMenu()
                    .setCustomId('linkOpenSetting')
                    .setPlaceholder('ããããé¸æ')
                    .addOptions({ label: 'å¨è¬è¨­å®', value: 'setting-linkOpen-1', emoji: '966588719635267624', default:true }),
            ]);
            button.addComponents([
                new discord.MessageButton()
                    .setCustomId('setting-linkOpen')
                    .setLabel(linkOpen ? 'ç¡å¹å' : 'æå¹å')
                    .setStyle(linkOpen ? 'DANGER' : 'SUCCESS'),
            ]);
            interaction.update({ embeds: [embed], components: [select, button], ephemeral:true });
        }
    },
};