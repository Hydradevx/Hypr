
module.exports = {
  name: 'info',
  aliases: ['i'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadinfomsg(page, prefix))
   console.log(`Info Command has been executed and page is ${page}`);
    

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  }
}

function loadinfomsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 🌟 **Info Commands - Page 1** 🌟
> 📊 **Command List:**
> 📈 **${prefix}stats**
> 🏓 **${prefix}ping**
> 🔍 **${prefix}userinfo**
> 🖼️ **${prefix}pfp**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  if (page == 2) {
    return(`
> ## 🌟 **Info Commands - Page 2** 🌟
> 👥 **${prefix}roles**
> 🔧 **${prefix}setprefix**
> 🔎 **${prefix}checkprefix**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}
