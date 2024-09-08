// Tags
export const cleanTag = (tag) => {
  return tag.trim().toLowerCase();
};

export const addUniqueTag = (tags, newTag) => {
  const cleanedTag = cleanTag(newTag);
  if (!tags.includes(cleanedTag)) {
    return [...tags, cleanedTag];
  }
  return tags;
};

// toast

export const getRandomMessage = (messages) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
