/* 
  Array.prototype.map() returns a copy of an array
  BUT NOT A COPY OF ITS OBJECTS (which is accessed by reference not by value)
*/

const source = [
  {
    id: 1,
    title: "Lorem Ipsum",
    modified: false,
  },
  {
    id: 2,
    title: "Dolor Sit",
    modified: false,
  },
  {
    id: 3,
    title: "Amet Consectetur",
    modified: false,
  },
];

const copy1 = source.map((s) => {
  if (s.id === 1) {
    s.modified = true;
  }
  return s;
});

const copy2 = copy1.map((s) => {
  if (s.id === 2) {
    s.modified = true;
  }
  return s;
});

const copy3 = source.map((s) => {
  if (s.id === 3) {
    return { ...s, modified: true };
  }
  return s;
});

// copy3[1].blow = "Altera em todas as listas porque a referência é a mesma";
copy3[2].blow =
  "Altera somente na lista 3 porque é um objeto com referência diferente (linha 35)";

// See the [modified] property across all the lists 🤔🤔
// Then toggle comment between lines 40 and 41 🤯🤯
console.log("Source", source);
console.log("Copy 1", copy1);
console.log("Copy 2", copy2);
console.log("Copy 3", copy3);
