import ShcoolAPI from "../API/index.js";
import { Telegraf } from "telegraf";

export default class {
    constructor(bot){
        this.bot = bot;
    }
    init() {
        this.bot.command('lesson', async(ctx) => {
            ctx.telegram.sendChatAction(ctx.update.message.chat.id, "typing")
            ctx.reply(this.toMessage((await ShcoolAPI(process.env.LOGIN, process.env.PASSWORD))))
        });
    }
    toMessage(data) {
        let out = ["#: Урок - ДЗ -  Время", "---------------------------"]
        data.map((e, i)=>{
            out.push(`${i+1}: ${e.lesson} - ${e.homework} - ${e.time}`)
            out.push(`---------------------------`)
        })
        return out.join('\n');
    }
}