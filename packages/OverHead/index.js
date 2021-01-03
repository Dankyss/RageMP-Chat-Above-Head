const msgtime = 5000 // how long the message stays up in ms

mp.events.add('playerJoin', player => {
  player.setVariable('headmsg', '');
});

mp.events.add('playerChat', (player, text) => {
  player.setVariable('headmsg', `${text}`);
  setTimeout(() => {
    player.setVariable('headmsg', '');
  }, msgtime);
});