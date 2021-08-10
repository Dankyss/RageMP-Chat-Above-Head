mp.events.add('playerJoin', player => {
  player.setVariable('headmsg', '');
});

mp.events.add('playerChat', (player, text) => {
  player.setVariable('headmsg', text);
  player.call('Client:runOverheadTimeout');
});

mp.events.add('Server:playerOverheadClear', player => {
  player.setVariable('headmsg', '');
});
