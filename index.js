const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const discordModals = require('discord-modals');
discordModals(client);
require('dotenv').config();

// interactionモジュール達
const interaction_button = require('./interaction/button');
const interaction_selectmenu = require('./interaction/selectmenu');
const interaction_modal = require('./interaction/modal');
const pagination = require('./modules/pagination');

// コマンドファイルを動的に取得する
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

try {
	//Repl.itでホスティングをする場合は、このコードを有効化する必要がある
	
	"use strict";
	const http = require('http');
	http.createServer(function(req, res) {
		res.write("ready nouniku!!");
		res.end();
	}).listen(8080);
	

	// ready nouniku!!(定期)
	client.once('ready', () => {
		console.log(`[DiscordBot-NoNick.js]`+'\u001b[32m'+' DiscordBotが起動しました。'+'\u001b[0m');
	});

	// メンバーが入ってきた時
	client.on('guildMemberAdd', member => {
		const { welcomeCh, welcomeMessage, welcome } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
		if (welcome) {
			const embed = new MessageEmbed()
			.setTitle('WELCOME - ようこそ!')
			.setDescription(`**<@${member.id}>**さん\n**${member.guild.name}** へようこそ!\n${welcomeMessage}\n\n現在のメンバー数:**${member.guild.memberCount}**人`)
			.setThumbnail(member.user.avatarURL())
			.setColor('#57f287');
			client.channels.cache.get(welcomeCh).send({embeds: [embed]}).catch(error => {
				console.log(`[DiscordBot-NoNick.js]`+'\u001b[31m'+' [ERROR]'+'\u001b[0m'+' 指定したチャンネルに入退室ログを送れませんでした。「/setting」で正しい・BOTが送信できるチャンネルIDを送信してください。');
			})
		}
	});

	// メンバーが抜けた時
	client.on('guildMemberRemove', member => {
		const { welcomeCh, welcome } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
		if (welcome) {
			client.channels.cache.get(welcomeCh).send(`**${member.user.username}** さんがサーバーを退出しました👋`).catch(error => {
				console.log(`[DiscordBot-NoNick.js]`+'\u001b[31m'+' [ERROR]'+'\u001b[0m'+' 指定したチャンネルに入退室ログを送れませんでした。「/setting」で正しい・BOTが送信できるチャンネルIDを送信してください。');
			})
		}
	});

  client.on('messageCreate', async message => {
    {
        if (message.channelId == '723525324880609349') {
            if (message.content == '') message.delete().catch((error) => console.log(error));
        }
        if (message.channelId == '717713480274280459') {
            await message.startThread({name: "スレッド"})
            .then((thread) => {
                const embed = new MessageEmbed()
                    .setTitle('質問チャンネルへようこそ!')
                    .setDescription('助けが必要ですか?\nこのパネルからスレッドのタイトル設定ができます!')
                    .setColor('GREEN')
                const button = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('title')
                        .setLabel('タイトルを変更')
                        .setStyle('PRIMARY')
                )
                thread.send({embeds: [embed], components: [button]});
            })
            .catch((e) => {
                console.log(e)
            })
        }

        const results = [...message.content.matchAll(/https:\/\/(?:.+\.)?discord(?:.+)?.com\/channels\/(?<guildId>\d+)\/(?<channelId>\d+)\/(?<messageId>\d+)/g)];
        results.forEach(async v => {
            try {
                const channel = client.channels.cache.get(v.groups.channelId);
                if(!channel || !channel.isText()) return;
                const msg = await channel.messages.fetch(v.groups.messageId);
                const infoEmbed = new MessageEmbed()
                    .setTitle('メッセージ展開')
                    .setColor('FFFFFF')
                    .setDescription(`<@!${msg.author.id}> [リンク](${v[0]})`)
                    .setThumbnail(msg.member?.displayAvatarURL({dynamic:true})??msg.author.displayAvatarURL({dynamic:true}));
                const contentEmbeds = msg.content?Util.splitMessage(msg.content,{maxLength:1024,char:''}).map(v => new MessageEmbed().setTitle('メッセージ展開').setColor('FFFFFF').addField('メッセージの内容',v)):[];
                const attachmentEmbeds = msg.attachments.map(v => new MessageEmbed().setTitle('メッセージ展開').setColor('FFFFFF').setImage(v.url));
                pagination.message(message,[infoEmbed,...contentEmbeds,...attachmentEmbeds,...msg.embeds]);
            }
            catch (err) {
                const em = new MessageEmbed()
                    .setTitle('エラー!')
                    .setColor('FF0000')
                    .setDescription(err);
                message.reply({embeds:[em]});
                console.log(err);
            }
        });
    }
});
  
	// コマンド処理
	client.on('interactionCreate', async interaction => {
		// スラッシュコマンド
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction,client);
			} catch (error) {
				console.error(error);
				const embed = new MessageEmbed()
					.setColor('#F61E2')
					.setDescription('インタラクションの実行中にエラーが発生しました。開発者にご連絡ください。')
				await interaction.reply({embeds: [embed], ephemeral: true});
			}
		}
		// コンテキストメニュー(メッセージ)
		if (interaction.isMessageContextMenu()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction,client);
			} catch (error) {
				console.error(error);
				const embed = new MessageEmbed()
					.setColor('#F61E2')
					.setDescription('インタラクションの実行中にエラーが発生しました。開発者にご連絡ください。')
				await interaction.reply({embeds: [embed], ephemeral: true});
			}
		}
		// ボタン
		if (interaction.isButton()) {
			try {
				await interaction_button.execute(interaction,client);
			} catch (error) {
				console.error(error);
				const embed = new MessageEmbed()
					.setColor('#F61E2')
					.setDescription('インタラクションの実行中にエラーが発生しました。開発者にご連絡ください。')
				await interaction.reply({embeds: [embed], ephemeral: true});
			}
		}

		// セレクトメニュー
		if (interaction.isSelectMenu()) {
			try {
				await interaction_selectmenu.execute(interaction,client);
			} catch (error) {
				console.error(error);
				const embed = new MessageEmbed()
					.setColor('#F61E2')
					.setDescription('インタラクションの実行中にエラーが発生しました。開発者にご連絡ください。')
				await interaction.reply({embeds: [embed], ephemeral: true});
			}
		}
	});

	// modalを受け取った時の処理
	client.on('modalSubmit', async (modal) => {
		try {
			await interaction_modal.execute(modal,client);
		} catch (error) {
			console.error(error);
			const embed = new MessageEmbed()
				.setColor('#F61E2')
				.setDescription('インタラクションの実行中にエラーが発生しました。開発者にご連絡ください。')
			await modal.reply({embeds: [embed], ephemeral: true});
		}
	})

	// BOTにログイン
	client.login(process.env.BOT_TOKEN);
} catch(error) {
	console.log(`[DiscordBot-NoNick.js]`+'\u001b[31m'+' [ERROR]'+'\u001b[0m'+' エラーが発生しました!');
	console.log(error);
}