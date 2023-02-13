import puppeteer from 'puppeteer';

export default async function (login, password) {
  const browser = await puppeteer.launch({args: ['--no-sandbox'],});
  const page = await browser.newPage();

  await page.goto('https://school.r-19.ru/personal-area/#diary');

  await page.setViewport({width: 800, height: 600});

  await page.waitForSelector('#username');
  await page.type('#username', process.env.LOGIN);
  await page.waitForSelector('#password');
  await page.type('#password', process.env.PASSWORD);
  await page.click("#form-submit")

  await page.waitForSelector(".dynamic > .today > table > tbody > tr");
  const text = await page.evaluate(async()=>{
    let page = [];
    let findDate = "";
    const date = new Date();
    const mount = date.getMonth()+1 > 9 ? date.getMonth()+1 : "0"+(date.getMonth()+1)
    const nowDate = `${date.getDate()}/${mount}`;
    const nextDate = `${date.getDate()+1}/${mount}`
    if(date.getHours()>13) document.querySelectorAll(".date").forEach((e)=>{if(nextDate==e.innerText)findDate=e})
    else document.querySelectorAll(".date").forEach((e)=>{if(nextDate==e.innerText)findDate=e})
    const data = findDate.parentNode.parentNode.querySelectorAll("table > tbody > tr")
    data.forEach((e, i)=>{
        const selectData = e.querySelectorAll('td');
        const outObj = {
            lesson: selectData[1].innerText,
            homework: selectData[3].innerText,
            time: selectData[0].innerText.split('\n')[2],
        }
        page.push(outObj);
    })
    return page;
  })
  await browser.close();

  return await text;
}