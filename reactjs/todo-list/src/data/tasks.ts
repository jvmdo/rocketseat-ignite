function generateLorem(min = 2, max = 16) {
  const length = Math.floor(Math.random() * (max - min)) + min;
  return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic porro temporibus vitae impedit voluptates animi rem."
    .split(" ")
    .slice(0, length)
    .join(" ");
}

export const data = Array.from({ length: 5 }, () => ({
  id: `${crypto.randomUUID()}`,
  text: generateLorem(),
  isDone: Math.random() > 0.5,
}));
