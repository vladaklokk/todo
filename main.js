document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".lists");
  const pencil = document.querySelector("#pencil");
  const ul = document.querySelector(".todos");
  const all = document.querySelector(".all");
  const active = document.querySelector(".active");
  const performed = document.querySelector(".performed");

  const save = document.querySelector(".save");
  const clear = document.querySelector(".clear");
  const tips = document.querySelector(".tipBtn");
  const x = document.querySelector(".closebtn");

  const analitic = document.querySelector(".analitic");
  const wordsa = document.querySelector(".words");
  const analUl2 = document.querySelector(".words2");
  const aut1 = document.querySelector(".aut1");
  const aut2 = document.querySelector(".aut2");
  const aut3 = document.querySelector(".aut3");
  const analiticData = document.querySelector(".analiticData");
  const noData = document.querySelector(".noData");

  const analit = document.querySelector(".analit");
  const change = document.querySelector(".changeItem");
  const toTodos = document.querySelector(".toTodos");
  const nav = document.querySelector(".nav");

  let words = [];
  let letters = []; 
  let a = 0;
  let b = 1;
  let lettersFun;
  
  pencil.addEventListener('click', () => {
    input.classList.toggle('display')
  })
  
  input.addEventListener('keypress', (e) => {
    if (e.which === 13) {
      let text = input.value
      input.value = ''
      add(text)
    }
  })
  
  function add(text){
    let content = document.querySelector('.content')
    const li = document.createElement('li')
    const span = document.createElement('span')
    const i = document.createElement('i')
    const p = document.createElement('p')
    const change = document.createElement('span');
    change.textContent = 'change';
    change.classList.add('changeItem');
    change.id = `item${b}`;
    p.classList.add('content', `item${b}`)
    p.textContent = text
    i.classList.add('fas','fa-trash-alt')
    ul.insertAdjacentElement('afterbegin', li)
    span.insertAdjacentElement('afterbegin', i)
    li.insertAdjacentElement('afterbegin', span)
    span.insertAdjacentElement('afterend', p)
    p.insertAdjacentElement('afterend', change)
    b++
 }
  

  
  ul.addEventListener('click', (e) => {
   if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked')
   }
   if (e.target.tagName === 'I') {
      e.target.parentElement.parentElement.remove()
   }
  })
  
  
  active.addEventListener('click', () => {
    const li = document.querySelectorAll('.todos li')
    for (let i = 0; i < li.length; i++) {
      li[i].style.display = 'list-item'
      if(li[i].className === 'checked') {
        li[i].style.display = 'none'
      } 
    }
  })

  function g(idE) {
    const content = document.querySelectorAll(`.${idE}`);
    input.value = content[0].textContent;
    a = 1;
    input.addEventListener("keypress", (e) => {
      if (e.which === 13 && input.value !== "") {
        content[0].textContent = input.value;
        input.value = "";
        a = 0;
      }
    });
  }

  function changeItem(){
    document.addEventListener('click', function(event) {
       let element
       let idE
       let content
       content = null, element = null, idE = null
       element = event.target;
       idE = element.id
       g(idE)
    });
 
 }
  active.addEventListener("click", () => {
    const li = document.querySelectorAll(".todos li");
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "list-item";
      if (li[i].className === "checked") {
        li[i].style.display = "none";
      }
    }
  });

  all.addEventListener("click", () => {
    const li = document.querySelectorAll(".todos li");
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "list-item";
    }
  });

  performed.addEventListener("click", () => {
    const li = document.querySelectorAll(".todos li");
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "list-item";
      if (li[i].className !== "checked") {
        li[i].style.display = "none";
      }
    }
  });

  clear.addEventListener("click", () => {
    wordsa.textContent = "";
    analUl2.textContent = "";
    aut1.textContent = "";
    aut2.textContent = "";
    aut3.textContent = "";
    lettersFun = undefined;
    letters = {};
    const li = document.querySelectorAll(".todos li");
    li.forEach((item) => item.remove());
  });

  tips.addEventListener("click", () => {
    const block = document.querySelector(".tipsBlock");
    block.style.animation = "fromtop 1s";
    block.style.display = "block";
  });

  x.addEventListener("click", () => {
    const block = document.querySelector(".tipsBlock");
    block.style.animation = "totop 1s forwards";
  });

  analit.addEventListener("click", () => {
    nav.style.display = "none";

    save.style.display = "none";
    clear.style.display = "none";
    tips.style.display = "none";

    pencil.style.display = "none";
    toTodos.style.display = "inline";
    analitic.style.display = "block";
    startAnalitic();
  });

  toTodos.addEventListener("click", () => {
    nav.style.display = "block";

    save.style.display = "inline";
    clear.style.display = "inline";
    tips.style.display = "inline";

    pencil.style.display = "block";
    toTodos.style.display = "none";
    analitic.style.display = "none";
  });

  function toStr(go) {
    lettersFun = undefined;
    const ul = document.querySelector(".todos");
    const ulLength = ul.children.length;

    for (let i = 0; i <= ulLength - 1; i++) {
      if (lettersFun === undefined) {
        lettersFun = ul.children[i].children[1].textContent;
      } else {
        lettersFun +=
          go === 0
            ? ul.children[i].children[1].textContent
            : " " + ul.children[i].children[1].textContent;
      }
    }
  }

  function addLetter() {
    wordsa.textContent = "";

    const letters = {};
    for (let i = 0; i < lettersFun.length; i++) {
      const letter = lettersFun[i];
      letters[letter] = letters[letter] ? letters[letter] + 1 : 1;
    }

    const keySort = Object.keys(letters).sort(
      (a, b) => letters[b] - letters[a]
    );

    let inputLength = lettersFun.length;

    for (let i = 0; i < keySort.length; i++) {
      const symbol = keySort[i];
      const interest = (letters[symbol] / inputLength) * 100;
      wordsa.insertAdjacentHTML(
        "beforeend",
        `<li>"${symbol}": ${letters[symbol]} - ${interest.toFixed(2)} %</li>`
      );
    }

    lettersFun = undefined;
  }

  function addWords() {
    toStr(1);
    const words1 = [];
    words1.push(lettersFun.split(" "));

    analUl2.textContent = "";
    const letters = {};
    for (let i = 0; i < words1[0].length; i++) {
      const letter = words1[0][i];
      letters[letter] = letters[letter] ? letters[letter] + 1 : 1;
    }

    const keySort = Object.keys(letters).sort(
      (a, b) => letters[b] - letters[a]
    );

    let inputLength = words1[0].length;

    for (let i = 0; i < keySort.length; i++) {
      const symbol = keySort[i];
      const interest = (letters[symbol] / inputLength) * 100;
      analUl2.insertAdjacentHTML(
        "beforeend",
        `<li>"${symbol}": ${letters[symbol]} - ${interest.toFixed(2)} %</li>`
      );
    }
  }

  function count() {
    toStr(1);
    words.push(lettersFun.split(" "));
    letters.push(lettersFun.split(""));
    aut1.textContent = ul.children.length;
    aut2.textContent = words[0].length;
    aut3.textContent = leter[0].length;
  }

  function startAnalitic() {
    if (ul.children.length !== 0) {
      analiticData.style.display = "block";
      noData.style.display = "none";
      toStr(0);
      addLetter();
      addWords();
      count();
    } else {
      analiticData.style.display = "none";
      noData.style.display = "block";
    }
  }
});
