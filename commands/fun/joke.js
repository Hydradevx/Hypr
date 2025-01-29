module.exports = {
  name: "joke",
  aliases: ["funny", "telljoke", "jk"],
  info: "tells a funny joke",
  usage: "joke",
  execute(message) {
    message.sendMessage("Loading a funny joke... 🤔").then((jokeMessage) => {
      const jokes = [
        "Why don’t scientists trust atoms? Because they make up everything!",
        "Why did the math book look sad? It had too many problems.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call fake spaghetti? An impasta.",
        "Why can’t your nose be 12 inches long? Because then it’d be a foot.",
        "What did one wall say to the other? 'I'll meet you at the corner!'",
        "Why was the broom late? It swept in!",
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "What’s orange and sounds like a parrot? A carrot!",
        "Why was the computer cold? It left its Windows open!",
        "Why did the golfer bring an extra pair of pants? In case he got a hole in one!",
        "What’s brown and sticky? A stick!",
        "Why don’t oysters donate to charity? Because they are shellfish.",
        "Why did the bicycle fall over? Because it was two-tired!",
        "How does a penguin build its house? Igloos it together!",
        "Why don’t eggs tell jokes? They’d crack each other up.",
        "What’s a skeleton’s least favorite room in the house? The living room!",
        "Why did the coffee file a police report? It got mugged!",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "Why can’t you give Elsa a balloon? Because she’ll let it go!",
        "What’s Forrest Gump’s password? 1Forrest1.",
        "How does a vampire start a letter? 'Tomb it may concern…'",
        "Why did the man put his money in the blender? He wanted to make some liquid assets!",
        "Why was the belt arrested? For holding up a pair of pants!",
        "What’s a ninja’s favorite type of shoes? Sneakers!",
        "What do you call a fish with no eyes? Fsh.",
        "Why don’t crabs give to charity? Because they’re shellfish.",
        "Why did the melon jump into the lake? It wanted to be a water-melon!",
        "Why did the stadium get hot after the game? All the fans left.",
        "What do you call an alligator in a vest? An investigator!",
        "What do you call cheese that isn’t yours? Nacho cheese!",
        "Why can’t you trust a duck with secrets? They always quack under pressure!",
        "How do you organize a space party? You planet.",
        "Why was the math book sad? It had too many problems.",
        "What did the ocean say to the shore? Nothing, it just waved!",
        "Why was the big cat disqualified from the race? Because it was a cheetah!",
        "Why don’t elephants use computers? They’re afraid of the mouse.",
        "Why did the skeleton go to the party alone? He had no body to go with him.",
        "How do cows stay up to date? They read the moos-paper.",
        "Why did the cookie go to the hospital? Because it felt crumby.",
        "What did one plate say to the other? 'Lunch is on me.'",
        "How does a bee brush its hair? With a honeycomb.",
        "What did the grape do when it got stepped on? Nothing but let out a little wine.",
        "Why can’t you trust stairs? They’re always up to something.",
        "What does a cloud wear under his raincoat? Thunderwear!",
        "Why do fish live in salt water? Because pepper makes them sneeze!",
        "What did the dog say to the tree? 'Bark!'",
        "Why do mushrooms get invited to parties? Because they’re a fungi.",
        "Why did the music teacher go to jail? She got caught with sharp notes.",
        "What did one hat say to the other? 'You stay here, I'll go on ahead.'",
        "What’s a pirate’s favorite letter? Arrr!",
        "How did the barber win the race? He knew a shortcut!",
        "Why was the fish a bad musician? Because he was always off-scale.",
        "Why did the cow become an astronaut? It wanted to see the moooon.",
        "What do you call a boomerang that doesn’t come back? A stick.",
        "Why did the elephant paint its toenails red? So it could hide in cherry trees.",
        "Why did the man throw the clock out the window? He wanted to see time fly.",
        "How do you make holy water? You boil the hell out of it.",
        "Why did the teddy bear say 'no' to dessert? Because it was stuffed.",
        "How do scientists freshen their breath? With experi-mints!",
        "What did the pirate say on his 80th birthday? Aye-matey.",
        "What did the janitor say when he jumped out of the closet? 'Supplies!'",
        "How do you fix a cracked pumpkin? With a pumpkin patch!",
        "Why don’t vampires have friends? They’re a pain in the neck.",
        "What did the buffalo say to his son? Bison!",
        "How does a penguin build its house? Igloos it together.",
        "Why did the coffee file a police report? It got mugged.",
        "What’s orange and sounds like a parrot? A carrot!",
      ];

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      const messages = [
        "Searching for a hilarious joke... 🤔",
        "Hold on... this joke is worth the wait! 🕒",
        "Almost there... just one more second! ⏳",
        "Ready for a funny one? 😄",
      ];

      let editCount = 0;
      const editInterval = setInterval(async () => {
        if (editCount < messages.length) {
          await jokeMessage.edit(messages[editCount]);
          editCount++;
        } else {
          await jokeMessage.edit(`😂 **Joke:** ${randomJoke}`);
          clearInterval(editInterval);
        }
      }, 1000);
      if (message.author.id == message.client.user.id)
        message.delete().catch(() => {});
      console.log(
        `Joke Command has been executed and Result is: ${randomJoke}`
      );
    });
  },
};
