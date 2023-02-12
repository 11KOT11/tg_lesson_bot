import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
dotenv.config();

import sendLesson from './module/sendLesson/index.js';

class Bot {
    constructor(TOKEN){
        this.TOKEN = TOKEN;
        this.bot = 0;
    }

    init() {
        this.bot = new Telegraf(this.TOKEN);
        const initLIST = [new sendLesson(this.bot)];
        initLIST.map((e)=>{e.init();})
        this.bot.launch();
    }
    
}

const test = new Bot(process.env.BOT);
test.init()