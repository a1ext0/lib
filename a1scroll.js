export const a1scroll = {
  s: {
    skipAn: function(opt) {
      //Длительность - duration, за сколько пикселей начать - dist, метод - style
      return function() {
        animate.call(this, {
          duration: opt.duration,
          timing: function timing(timeFraction) {
            return opt.style(timeFraction);
          },
          draw: function(prg, csrTo, page) {
            window.scrollTo(0, (csrTo * prg) + page);
          },
          dist: opt.dist,
        });
      };
    }
  },
  style: {
    easeIn: function(timeFraction) {return Math.pow(timeFraction, 2);},
    easeOut: function(timeFraction) {return 1 - a1scroll.style.easeIn(1 - timeFraction);},
    easeInOut: function(timeFraction) {if (timeFraction < .5) {return a1scroll.style.easeIn(timeFraction) * 2;} else {return 1 - a1scroll.style.easeIn(1 - timeFraction) * 2;}}}
};

function animate(opt) {
  let start = performance.now();
  let to = document.querySelector(this.getAttribute('href'));
  let res;
  if (pageYOffset < to.getBoundingClientRect().y + pageYOffset) {
    res = opt.dist;
  } else {
    res = -opt.dist;
  }
  let page = (to.getBoundingClientRect().y + pageYOffset) - res;
  requestAnimationFrame(function anim(time) {
    //from 0 to 1
    let timeFraction = (time - start) / opt.duration;
    if (timeFraction > 1) timeFraction = 1;
    //current animation progress
    let progress = opt.timing(timeFraction);
    //draw function
    opt.draw(progress, res, page);
    //reqursion
    if (timeFraction < 1) {
      requestAnimationFrame(anim);
    }
  });
}
