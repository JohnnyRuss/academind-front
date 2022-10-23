export function groupMessages(messages) {
  if (!messages) return;

  let msgChain = [];
  let nestedChain = [];

  return messages
    .map((msg, i, arr) => {
      function copyAndDelete(message) {
        nestedChain = [...msgChain];
        msgChain = [];
        if (message) msgChain.push(message);
        return nestedChain;
      }

      if ((arr[i + 1] && msg?.user === arr[i + 1]?.user) || msg?.user === arr[i - 1]?.user) {
        if (msgChain[0] && msgChain[0].user !== msg.user) return copyAndDelete(msg);
        else msgChain.push(msg);
      } else if (msg.user !== arr[i - 1]?.user && msgChain[0]) return copyAndDelete(msg);
      else if (msgChain[0] && msgChain[0].user === msg.user) {
        msgChain.push(msg);
        return copyAndDelete();
      } else return copyAndDelete(msg);
    })
    .filter((msgBlock) => Array.isArray(msgBlock) && msgBlock.length >= 1)
    .concat([msgChain]);
}
