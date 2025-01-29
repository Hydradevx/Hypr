
module.exports = {
  name: 'tools',
  aliases: ['t', 'tool'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadtoolsmsg(page, prefix))
   console.log(`Tools Command has been executed and page is ${page}`);
    

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  }
}

function loadtoolsmsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 🚨 **Tools Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 👤 **${prefix}kick**
> 🚫 **${prefix}ban**
> 🔓 **${prefix}unban**
> 🔇 **${prefix}mute**
> 📝 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}
