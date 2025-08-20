const venom = require('venom-bot');

// Keep track of first-time users
let greetedUsers = new Set();

venom
  .create({
    session: 'my-bot-session',
    headless: 'new', // Recommended way for servers
    puppeteerOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    }
  })
  .then((client) => start(client))
  .catch((err) => console.log(err));

function start(client) {
  console.log("🤖 Bot is running and ready!");

  client.onMessage(async (message) => {
    const text = message.body.toLowerCase().trim();
    const sender = message.from;

    // 📌 First-time greeting OR "hi"
    if (!greetedUsers.has(sender) || text === "hi" || text === "hello") {
      greetedUsers.add(sender);

      await client.sendText(
        sender,
        `👋 Hi, you have messaged *Prajwal*.\nHold on, he will reply to you in some time. ⏳`
      );

      return; // stop here so it doesn’t trigger other handlers
    }

    // ⏰ Example extra command
    if (text === "time") {
      const now = new Date();
      await client.sendText(sender, `⏰ Current time is: ${now.toLocaleTimeString()}`);
    }

    // 😂 Example extra command
    else if (text === "joke") {
      const jokes = [
        "Why don’t skeletons fight each other? They don’t have the guts! 💀",
        "I told my computer I needed a break, and it said: 'No problem, I’ll go to sleep.' 😴",
        "Why was the math book sad? Because it had too many problems. 📘"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      await client.sendText(sender, randomJoke);
    }
  });
}