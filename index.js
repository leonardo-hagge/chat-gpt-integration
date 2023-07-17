import express from 'express';
import cors from 'cors';


import { ChatGPTAPIBrowser } from "chatgpt";

const app = express();
const PORT = 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
	res.json({
		message: "Hello world",
	});
});


// use puppeteer to bypass cloudflare (headful because of captchas)
const api = new ChatGPTAPIBrowser({
	email: "leonardo.hagge@bel.ind.br",
	password: "SUA SENHA RATÃO",


},);
await api.initSession();

// const database = [];
// const generateID = () => Math.random().toString(36).substring(2, 10);

async function chatResponse(quest) {
	return await api.sendMessage(
		quest
	);
}

app.post("/api/quest", (req, res) => {
	const { quest } = req.body;

	(async () => {
		// const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
		// const page = await browser.newPage();
		// await page.goto(url);

		// const websiteContent = await page.evaluate(() => {
		// 	return document.documentElement.innerText.trim();
		// });
		// const websiteOgImage = await page.evaluate(() => {
		// 	const metas = document.getElementsByTagName("meta");

		// 	for (let i = 0; i < metas.length; i++) {
		// 		if (metas[i].getAttribute("property") === "og:image") {
		// 			return metas[i].getAttribute("content");
		// 		}
		// 	}
		// });


		let response = await chatResponse(quest);

		return res.json({
			answer: response.response,
		});

		// result.brandImage = websiteOgImage;
		// result.id = generateID();
		// database.push(result);

		// return res.json({
		// 	message: "Request successful!",
		// 	database,
		// });

		// await browser.close();
	})();
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
