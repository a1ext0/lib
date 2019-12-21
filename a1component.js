export function a1component(opt) {
  //Родительский - main, Template = temp, Дополнительные евенты - after (on - какой элемент, type = тип события, fun = вызов функции), анимация - style
  return ()=> {
    if (event) {
      event.preventDefault();
    }
    opt.element =  document.querySelector(opt.main);
    component.animate('out', opt);
    opt.element.addEventListener('animationend', component.change(opt), {once: true});
  };
}

const component = {
  animate: function(type, opt) {
      console.log(opt.element.classList);
      if (opt.style) {
        opt.element.classList.add('animated', opt.style.speed, opt.style.type[type]);
        opt.element.addEventListener('animationend', function() {
          opt.element.classList.remove(opt.style.type[type]);
        }, {once: true});
      } else {
        if (type == 'out') {
          opt.element.classList.add('animated', 'faster', 'fadeOut');
          opt.element.addEventListener('animationend', function() {
            opt.element.classList.remove('fadeOut');
          }, {once: true});
        } else {
          opt.element.classList.add('animated', 'faster', 'fadeIn');
          opt.element.addEventListener('animationend', function() {
            opt.element.classList.remove('fadeIn');
          }, {once: true});
        }
      }
    },
  change: function(opt) {
    return function() {
      opt.element.innerHTML = '';
      window.scrollTo(0, 0);
      opt.element.append(document.querySelector(opt.temp).content.cloneNode(true));
      component.animate('in', opt);
      if (Array.isArray(opt.after)) {
        for (let evnt of opt.after) {
          document.querySelector(evnt.on).addEventListener(evnt.type, evnt.fun);
        }
      }
    };
  },
};
