const fs = require('fs');
const { MessageEmbed, Formatters } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const setting_module = require('../modules/setting');

module.exports = {
    async execute(interaction,client) {
		const mentionok = "743446391820648568";
		const hive = "827401010556305509";
		const cubecarft = "914926676738199642";
		const galaxite = "827401048234786856";
		const hypixel = "914926610728243220";

		if (interaction.customId == 'mentionok') {
			if (interaction.member.roles.cache.has(mentionok)) {
				interaction.member.roles.remove(mentionok)
				interaction.reply({content: `<@&${mentionok}>を外しました!`, ephemeral:true});
				return;
			}
			interaction.member.roles.add(mentionok);
			interaction.reply({content: `<@&${mentionok}>を付与しました!`, ephemeral:true});
		}

		if (interaction.customId == 'hive') {
			if (interaction.member.roles.cache.has(hive)) {
				interaction.member.roles.remove(hive)
				interaction.reply({content: `<@&${hive}>を外しました!`, ephemeral:true});
				return;
			}
			interaction.member.roles.add(hive);
			interaction.reply({content: `<@&${hive}>を付与しました!`, ephemeral:true});
		}

		if (interaction.customId == 'cubecraft') {
			if (interaction.member.roles.cache.has(cubecarft)) {
				interaction.member.roles.remove(cubecarft)
				interaction.reply({content: `<@&${cubecarft}>を外しました!`, ephemeral:true});
				return;
			}
			interaction.member.roles.add(cubecarft);
			interaction.reply({content: `<@&${cubecarft}>を付与しました!`, ephemeral:true});
		}

		if (interaction.customId == 'galaxite') {
			if (interaction.member.roles.cache.has(galaxite)) {
				interaction.member.roles.remove(galaxite)
				interaction.reply({content: `<@&${galaxite}>を外しました!`, ephemeral:true});
				return;
			}
			interaction.member.roles.add(galaxite);
			interaction.reply({content: `<@&${galaxite}>を付与しました!`, ephemeral:true});
		}

		if (interaction.customId == 'hypixel') {
			if (interaction.member.roles.cache.has(hypixel)) {
				interaction.member.roles.remove(hypixel)
				interaction.reply({content: `<@&${hypixel}>を外しました!`, ephemeral:true});
				return;
			}
			interaction.member.roles.add(hypixel);
			interaction.reply({content: `<@&${hypixel}>を付与しました!`, ephemeral:true});
		}
		
        if (interaction.customId == 'setting1-enable') {
			const { welcome, welcomeCh } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
			if (welcome) {
				setting_module.change_setting("welcome", false);
				interaction.reply({content: Formatters.formatEmoji('968351750434193408') + ' 入退室ログを**オフ**にしました。', ephemeral: true});
			} else {
				if(welcomeCh == null) {
					const embed = new MessageEmbed()
						.setDescription('**入退室ログを送信するチャンネルIDが指定されていません。**\nセレクトメニューから「送信先の変更」で設定してください。')
						.setColor('RED');
					interaction.reply({embeds: [embed], ephemeral:true}); 
					return;
				}
				setting_module.change_setting("welcome", true);
				interaction.reply({content: Formatters.formatEmoji('758380151544217670') + ' 入退室ログを**オン**にしました。', ephemeral: true});
			}
		}
		if (interaction.customId == 'setting1-restore') {
			setting_module.restore_welcome();
			interaction.reply({content: '💥 **設定を初期状態に復元しました。**', ephemeral:true});
		}

		if (interaction.customId == 'timeoutSetting-logEnable') {
			const { timeoutLog, timeoutLogCh } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
			if (timeoutLog) {
				setting_module.change_setting("timeoutLog", false);
				interaction.reply({content: Formatters.formatEmoji('968351750434193408') + ' タイムアウトログを**オフ**にしました。', ephemeral: true});
			} else {
				if(timeoutLogCh == null) {
					const embed = new MessageEmbed()
						.setDescription('**タイムアウトログを送信するチャンネルIDが指定されていません。**\nセレクトメニューから「送信先の変更」で設定してください。')
						.setColor('RED');
					interaction.reply({embeds: [embed], ephemeral:true}); 
					return;
				}
				setting_module.change_setting("timeoutLog", true);
				interaction.reply({content: Formatters.formatEmoji('758380151544217670') + ' タイムアウトログを**オン**にしました。', ephemeral: true});
			}
		}
		if (interaction.customId == 'timeoutSetting-dmEnable') {
			const { timeoutDm, timeoutDmString } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
			if (timeoutDm) {
				setting_module.change_setting("timeoutDm", false);
				interaction.reply({content: Formatters.formatEmoji('968351750434193408') + ' タイムアウトした人への警告DMを**オフ**にしました。', ephemeral: true});
			} else {
				if(timeoutDmString == null) {
					const embed = new MessageEmbed()
						.setDescription('**警告DMに送信する内容が指定されていません。**\nセレクトメニューから「警告DMに送信するメッセージの変更」で設定してください。')
						.setColor('RED');
					interaction.reply({embeds: [embed], ephemeral:true}); 
					return;
				}
				setting_module.change_setting("timeoutDm", true);
				interaction.reply({content: Formatters.formatEmoji('758380151544217670') + ' タイムアウトした人への警告DMを**オン**にしました。', ephemeral: true});
			}
		}
		if (interaction.customId == 'timeoutSetting-restore') {
			setting_module.restore_timeout();
			interaction.reply({content: '💥 **設定を初期状態に復元しました。**', ephemeral:true});
		}

		if (interaction.customId == 'banidSetting-logEnable') {
			const { banidLog, banidLogCh } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
			if (banidLog) {
				setting_module.change_setting("banidLog", false);
				interaction.reply({content: Formatters.formatEmoji('968351750434193408') + ' BANIDログを**オフ**にしました。', ephemeral: true});
			} else {
				if(banidLogCh == null) {
					const embed = new MessageEmbed()
						.setDescription('**BANIDログを送信するチャンネルIDが指定されていません。**\nセレクトメニューから「ログを送信するチャンネルの変更」で設定してください。')
						.setColor('RED');
					interaction.reply({embeds: [embed], ephemeral:true}); 
					return;
				}
				setting_module.change_setting("banidLog", true);
				interaction.reply({content: Formatters.formatEmoji('758380151544217670') + ' BANIDログを**オン**にしました。', ephemeral: true});
			}
		}
		if (interaction.customId == 'banidSetting-restore') {
			setting_module.restore_banid();
			interaction.reply({content: '💥 **設定を初期状態に復元しました。**', ephemeral:true});
		}

		if (interaction.customId == 'reportSetting-mentionEnable') {
			const { reportRoleMention, reportRole } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
			if (reportRoleMention) {
				setting_module.change_setting("reportRoleMention", false);
				interaction.reply({content: Formatters.formatEmoji('968351750434193408') + ' BANIDログを**オフ**にしました。', ephemeral: true});
			} else {
				if(reportRole == null) {
					const embed = new MessageEmbed()
						.setDescription('**メンションするロールが指定されていません。**\nセレクトメニューから「メンションするロールの変更」で設定してください。')
						.setColor('RED');
					interaction.reply({embeds: [embed], ephemeral:true}); 
					return;
				}
				setting_module.change_setting("reportRoleMention", true);
				interaction.reply({content: Formatters.formatEmoji('758380151544217670') + ' BANIDログを**オン**にしました。', ephemeral: true});
			}
		}

		if (interaction.customId == 'reportSetting-restore') {
			setting_module.restore_report();
			interaction.reply({content: '💥 **設定を初期状態に復元しました。**', ephemeral:true});
		}
		
		if (interaction.customId == 'report') {
			const modal = new Modal()
				.setCustomId('reportModal')
				.setTitle('あと1ステップです')
				.addComponents(
				new TextInputComponent()
					.setCustomId('textinput')
					.setLabel('このメッセージはサーバールールの何に違反していますか?')
					.setPlaceholder('できる限り詳しく入力してください。')
					.setStyle('LONG')
					.setRequired(true)
				);
			showModal(modal, {client, interaction});
		}

		if (interaction.customId == 'title') {
			const modal = new Modal()
				.setCustomId('changetitle')
				.setTitle('スレッド名')
				.addComponents(
				new TextInputComponent()
					.setCustomId('textinput')
					.setLabel('タイトル')
					.setStyle('SHORT')
					.setMaxLength(50)
					.setRequired(true)
				);
			showModal(modal, {client, interaction});
		}
    }
}