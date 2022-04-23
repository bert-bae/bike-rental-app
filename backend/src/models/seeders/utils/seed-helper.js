const randomizeTrait = (traitList) => {
  return traitList[Math.floor(Math.random() * traitList.length)];
};

const fakeEntityArray = (size, entityGenerator) => {
  const list = [];
  for (let i = 0; i < size; i++) {
    list.push(entityGenerator());
  }
  return list;
};

module.exports = {
  randomizeTrait,
  fakeEntityArray,
};
