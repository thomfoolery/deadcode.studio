import { ConsoleEntryTypes } from '../../reducers/console';

export function parsePauseTag(value) {
  switch (value) {
    case 'none':
      return 0;
    case 'short':
      return 1000;
    case 'medium':
      return 2 * 1000;
    case 'long':
      return 3 * 1000;
    case 'extra-long':
      return 5 * 1000;
    case 'dramatic':
      return 10 * 1000;
    default:
      Number(value);
  };
}
export function getOptionsFromTags(tags, content) {
  const fallbackRandomDelay = 1000 + Math.random() * 1000;
  const delay = !content.startsWith('$$BLANK') ?
    tags.reduce((acc, tag) => {
      return tag.trim().startsWith('PAUSE') ?
        parsePauseTag(tag.replace('PAUSE', '').trim()) :
        acc
    }, fallbackRandomDelay) :
    0

  const color = tags.reduce((acc, tag) => {
    return tag.trim().startsWith('COLOR') ?
      tag.replace('COLOR', '').trim() :
      acc
  }, null)

  const classNames = tags.reduce((acc, tag) => {
    if (tag.trim().startsWith('CLASS')) {
      return acc.concat(
        tag.trim().replace('CLASS', '').trim().split(' ')
      );
    }
    if (tag.trim().startsWith('EFFECTS')) {
      return acc.concat(
        tag.trim().replace('EFFECTS', '').trim().split(' ').map((v) => `effect-${v}`)
      );
    }
    return acc;
  }, [])

  return {
    color,
    delay,
    classNames,
  };
}

export function getEntry(storyEngine) {
  if (storyEngine.canContinue) {
    const content = storyEngine.Continue();
    const type = content.startsWith('$$PLAY') ?
      ConsoleEntryTypes.Special :
      ConsoleEntryTypes.Output

    return {
      type,
      tags: storyEngine.currentTags,
      options: getOptionsFromTags(storyEngine.currentTags, content),
      content: !content.startsWith('$$BLANK') ? content : ' ',
    };
  }

  return null;
}

// export function getEntries(storyEngine) {
//   const entries = [];

//   while (storyEngine.canContinue) {
//     const content = storyEngine.Continue();
//     const type = content.startsWith('$$PLAY') ?
//       ConsoleEntryTypes.Special :
//       ConsoleEntryTypes.Output

//     entries.push({
//       type,
//       tags: storyEngine.currentTags,
//       options: getOptionsFromTags(storyEngine.currentTags, content),
//       content: !content.startsWith('$$BLANK') ? content : ' ',
//     });
//   }

//   return entries;
// }
