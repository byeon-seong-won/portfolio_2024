 // 메인 효과
let didScroll = false;
let paralaxTitles = document.querySelectorAll('.paralax-title');
let paralaxTitles02 = document.querySelectorAll('.paralax-title02');
let profileImg = document.querySelectorAll('.prImg');
let paralaxBox = document.querySelectorAll('.image-container');



const scrollInProgress = () => {
  didScroll = true
}

const raf = () => {
  if(didScroll) {
    paralaxTitles.forEach((element, index) => {
      element.style.transform = "scale(5)"
    })
		paralaxTitles02.forEach((element, index) => {
      element.style.transform = "translateX("+ window.scrollY / -5 + "%)"
    })
    paralaxBox.forEach((element, index) => {
      // element.style.transform = "translate("+ window.scrollY / 5 + "%)"
      // element.style.transform = "rotate("+ window.scrollY / -10 + "deg)"
    })
		profileImg.forEach((element, index) => {
      element.style.transform ="scale("+ window.scrollY / 20 + "%)"
    })


  
    didScroll = false;
		
  }
  requestAnimationFrame(raf);
}


requestAnimationFrame(raf);
window.addEventListener('scroll', scrollInProgress)













// main - locomotive scroll
const scroller = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
})

gsap.registerPlugin(ScrollTrigger)


scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
  '.container', {
      scrollTop(value) {
          return arguments.length ?
          scroller.scrollTo(value, 0, 0) :
          scroller.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
          return {
              left: 0, top: 0, 
              width: window.innerWidth,
              height: window.innerHeight
          }
      }
  }
)

ScrollTrigger.create({
  trigger: '.image-mask',
  scroller: '.container',
  start: 'top+=30% 50%',
  end: 'bottom-=40% 50%',
  animation: gsap.to('.image-mask', {backgroundSize: '120%'}),
  scrub: 2,
  // markers: true
})

ScrollTrigger.addEventListener('refresh', () => scroller.update())

ScrollTrigger.refresh()











window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = document.querySelector(".bgContainer");
  pageContainer.setAttribute("data-scroll-container", "");

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    getDirection: true
  });

  scroller.on("scroll", function (t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
  });

  // Pinning and horizontal scrolling

  let horizontalSections = document.querySelectorAll(".horizontal-scroll");

  horizontalSections.forEach((horizontalSection) => {
    let pinWrap = horizontalSection.querySelector(".pin-wrap");
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    gsap.to(pinWrap, {
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        scrub: true,
        trigger: horizontalSection,
        pin: true,
        start: "top top",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: -horizontalScrollLength,
      ease: "none"
    });
  });


  /* COLOR CHANGER */
  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: "[data-scroll-container]",
      start: "top 50%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());

  ScrollTrigger.refresh();
});





document.addEventListener('mousemove', (e) => {
  let mouseX = e.pageX + 10;
  let mouseY = e.pageY + 10; 

  let cursor = document.querySelector('.cursor');
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
})







var swiper1 = new Swiper('.swiper-container01', {
  loop : true,
  slidesPerView: 1,
  spaceBetween: 0,
  freeMode: false,
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  effect : 'fade', 
  fadeEffect: 
  { crossFade: true },

 
}); 




















const animationOptions = {
  ease: "expo.inOut"
};

const introAnimation = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: animationOptions.ease,
      duration: 1
    }
  });

  tl.to(".intro__title", {
    duration: 1.5,
    y: 0,
    autoAlpha: 1,
    delay: 0.5
  })
    .to(".intro__background--left, .intro__background--right", {
      scaleX: 1
    })
    .to(".intro__background--left, .intro__background--right", {
      scaleY: 0,
      transformOrigin: "top center"
    })
    .to(
      ".intro__title",
      {
        duration: 1.5,
        y: -60,
        autoAlpha: 0
      },
      "-=0.6"
    )
    .to(
      ".intro",
      {
        y: "-100%"
      },
      "-=0.5"
    );

  return tl;
};

const skewInElements = (elements) => {
  const tl = gsap.timeline();

  tl.from(elements, {
    duration: 1,
    ease: animationOptions.ease,
    skewY: -5,
    autoAlpha: 0,
    y: 40
  });

  return tl;
};

const fadeInElements = (elements) => {
  const tl = gsap.timeline();

  tl.from(elements, {
    duration: 1,
    ease: animationOptions.ease,
    y: "20px",
    autoAlpha: 0,
    stagger: 0.1
  });

  return tl;
};

const master = gsap.timeline({
  paused: false,
  delay: 0.2
});

master
  .add(introAnimation())
  .add(fadeInElements(".header__logo, .header__nav a"))
  .add(skewInElements("h1, .hero__col--2 img"), "-=1");






