
import { chessScene, id } from "https://cdn.statically.io/gh/chris-ain/hand/main/chess.js";
import { curtainsmain, pl, destroyPlane } from "https://cdn.statically.io/gh/chris-ain/hand/main/curtainsmain.js";
import { planesTrans, curtainsTransFunc, destroyPlaneTrans  } from "https://cdn.statically.io/gh/chris-ain/hand/main/curtainsTrans.js";
import { curtainsAg, curtainsgenturfunc, destroyPlaneAg } from "https://cdn.statically.io/gh/chris-ain/hand/main/curtainsagentur.js";
import { plDet, curtainsProjDet, destroyPlaneProjDet} from "https://cdn.statically.io/gh/chris-ain/hand/main/curtainsdet.js";
import { curtainsprounder, curtainsproundermain, destroyPlaneproj  } from "https://cdn.statically.io/gh/chris-ain/hand/main/curtainprounder.js";
import { curtainsP, projfunc, destroyPlaneP } from 'https://cdn.statically.io/gh/chris-ain/hand/main/projekte.js'
import {slider1} from "https://cdn.statically.io/gh/chris-ain/hand/main/slider.js"
import {menu, trans} from "https://cdn.statically.io/gh/chris-ain/hand/main/menu.js"



window.addEventListener("load", function(event) {
gsap.registerPlugin(ScrollTrigger);
gsap.set(".page_wrap",{ autoAlpha: 0, opacity:0  });

//MAIN//

  function init() {

    
    var imagesLoaded = 0;
    const body = document.body;
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);
    const pageWrap = select(".page_wrap");
    const loader = select(".js-loader");
    const loaderInner = select(".js-loader__inner");
    const progressBar = select(".js-loader__progress");
    const loaderMask = select(".js-loader__mask");
    const canvastrans = document.querySelector("#chess");
    const homeCurtainsCanvas = document.querySelector(".canvas_agentur");
    let smoothScroll;

    ////////BARBA INIT//////////

    // show loader on page load
    gsap.set(loader, { autoAlpha: 1 });

    // scale loader down
    gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: "bottom" });

    initPageTransitions();

    function pageTransitionIn({ container }) {
      // timeline to stretch the loader over the whole screen
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
        },
      });
      tl.set(loaderInner, { autoAlpha: 0 })
        .fromTo(loader, { yPercent: -100 }, { yPercent: 0 })
        .fromTo(loaderMask, { yPercent: 80 }, { yPercent: 0 }, 0)

      return tl;
    }

    function pageTransitionOut({ container }) {
      // timeline to move loader away down
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
        },
        onComplete: () => initScript(),
      });
      
      tl.to(loader, { yPercent: 100 }).to(loaderMask, { yPercent: -80 }, 0);
    
      return tl;
    }

    function initPageTransitions() {
      barba.hooks.before(() => {

        select("html").classList.add("is-transitioning");
        
      });

      barba.hooks.after(() => {

        select("html").classList.remove("is-transitioning");
        // reinit locomotive scroll
        smoothScroll.init();
        
      });

      // scroll to the top of the page
      barba.hooks.enter(() => {
        window.scrollTo(0, 0);
      });

      /////////// VIEWS /////////////////////////

      barba.init({
        views: [
          /////////// HOME /////////////////////////
          {
            namespace: "home",

            beforeEnter() {
              setTimeout(function () {
                trans.out();
              },200)
              setTimeout(function () {
                trans.in();	
                },2000);
            },

            afterEnter() { 
              $('#page_content').imagesLoaded( {
                // options...
                },
                function() {
                  curtainsmain(smoothScroll);
                  chessScene();
                  slider1()
                  gsap.to(".page_wrap",{ autoAlpha: 1, opacity:1, duration: 0, delay:1.7 });

                  gsap.to(".icon", {
                    opacity: 0,
                    delay:3,
                    duration: 1,
                  });

                }
              );     
            },

            beforeLeave(data) {
              // gsap.ticker.remove(raf);
              cancelAnimationFrame( id );
              destroyPlane()
            },
          },
          /////////// AGENTUR /////////////////////////
          {
            namespace: "agentur",
            beforeEnter() {
              setTimeout(function () {
                if (trans.animating) {
                  return
                } else {
                  trans.in();
                }
              
              },200)
         
            
            },

            afterEnter() {
              $('#page_content').imagesLoaded( {
                // options...
                },
                function() {
                   curtainsgenturfunc(smoothScroll);
                    gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:1.3 });
           
   
                }
              );
       
            },

            beforeLeave(data) {
              setTimeout(function () {
                destroyPlaneAg()
              },1000);

            },
          },
          /////////// PROJEKTE /////////////////////////
          {
            namespace: "projekte",
            beforeEnter() {
              	const container = document.body

    // Preload images
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('img'), resolve);
        });
    };
    // And then..
    preloadImages().then(() => {
        // Remove the loader
        // document.body.classList.remove('loading');
        if (trans.animating) {
          return
        } else {
          trans.in();
        }           
   
      
	});
             
          
            },

            afterEnter() {
           
              $('#page-content').imagesLoaded( function() {
                setTimeout(function () {
                  trans.in();	
                  },2000);
                  gsap.to(".icon", {
                    opacity: 0,
                    delay:3,
                    duration: 1,
                  })
                gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });
                curtainsproundermain(smoothScroll);                      
              });  
            },

            beforeLeave(data) {
           
              setTimeout(function () {
        
                destroyPlaneproj()
 

            },1600);
            },
          },
          /////////// PROJEKTDETAIL /////////////////////////
          {
            namespace: "projektdetail",
            beforeEnter() {
              setTimeout(function () {
                if (trans.animating) {
                  return
                } else {
                  trans.in();
                }           
              },200)
            },

            afterEnter() {
              gsap.set(".pro_in", {
                opacity:0,
                duration:.3
              
              })

              $('#images').imagesLoaded()
              .always( function( instance ) {
                console.log('all images loaded');
              })
              .done( function( instance ) {
                setTimeout(function () {
                  trans.in();	
                  },2000);
                  curtainsTransFunc(smoothScroll)
                  curtainsProjDet(smoothScroll);  

                  setTimeout(function () {
                    trans.in();	
                    },1600);

                   const projTL = gsap.timeline()
                    projTL.to(".img_fullscreen", {
                      delay: 0.4,
                      opacity: 0.5,
                      duration: 1,
                    });

                    projTL.to(".pro_in", {
                      opacity:1,
                      stagger:.2
                  
                    })


                    gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });
                    
                    const nexProjButton = document.querySelector('.next_proj')
                    nexProjButton.addEventListener('click',() => {
                      smoothScroll.stop();
                      smoothScroll.destroy();
                      gsap.to("#fullscreen", {
                        opacity:0,
                        duration:0,
                      })
                    })

                    const brandbutton = document.querySelector('#brand')
                    brandbutton.addEventListener('click',() => {w
                     
                      gsap.to("#fullscreen", {
                        opacity:1,
                        duration:0,
                      })
                    })               })
              .fail( function() {
                console.log('all images loaded, at least one is broken');
              })
              .progress( function( instance, image ) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                console.log( 'image is ' + result + ' for ' + image.img.src );
              });

            },

            beforeLeave(data) {
              // smoothScroll.stop();

              setTimeout(function () {    
                destroyPlaneProjDet();
              },2000);
            },
          },

        /////////// Jobs /////////////////////////
        {
          namespace: "jobs",
          beforeEnter() {
            setTimeout(function () {
              if (trans.animating) {
                return
              } else {
                trans.in();
              }           
            },200)

          },
          afterEnter() {
  
              gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });

          },

          beforeLeave(data) {
         
          },
        },

           /////////// Kontakt /////////////////////////
           {
            namespace: "kontakt",
            beforeEnter() {
              setTimeout(function () {
                if (trans.animating) {
                  return
                } else {
                  trans.in();
                }           
              },200)

            },
            afterEnter() {
                      gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });

  
            },
  
            beforeLeave(data) {
        
            },
          },
               /////////// Logofolio /////////////////////////
           {
            namespace: "logofolio",
            beforeEnter() {
              trans.out();

            },
            afterEnter() {
              $(document).ready(function () {

                setTimeout(function () {
                  trans.in();	
                  },2000);
                gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });
              });
  
            },
  
            beforeLeave(data) {
          
            },
          },
           /////////// Sachverständiger /////////////////////////
           {
            namespace: "sachverständiger",
            beforeEnter() {
              setTimeout(function () {
                if (trans.animating) {
                  return
                } else {
                  trans.in();
                }           
              },200)

            },
            afterEnter() {
              $(document).ready(function () {
                setTimeout(function () {
                  trans.in();	
                  },2000);
                gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });
              });
  
            },
  
            beforeLeave(data) {
          
            },
          },

            /////////// ProjHorizontal /////////////////////////
            {
              namespace: "proj",
              beforeEnter() {
                setTimeout(function () {
                  if (trans.animating) {
                    return
                  } else {
                    trans.in();
                  }           
                },200)
  
              },
              afterEnter() {
                $(document).ready(function () {
                  setTimeout(function () {
                    trans.in();	
                    },2000);

                    projfunc(smoothScroll);
		 const proclick = document.querySelector('canvas')
                    proclick.addEventListener('click',() => {
                      smoothScroll.stop();
                      smoothScroll.destroy();
             
                      })
                  gsap.to(".page_wrap",{ autoAlpha: 1, duration: 1, delay:.5 });

                 
                });
    
              },
    
              beforeLeave(data) {
                setTimeout(function () {
                  destroyPlaneP()
                  },2000);
           
              },
            },


        ],

        

        /////////// TRANSITIONS /////////////////////////

        sync: true,
        debug: true,
        timeout: 7000,
        transitions: [
          {
            name: "overlay-transition",
            once(data) {
              // do something once on the initial page load
              initSmoothScroll(data.next.container);

              initLoader();
  
            },
            async leave(data) {
              // animate loading screen in

            

              
              await delay(2000);

              data.current.container.remove();
            },
            async enter(data) {
              // animate loading screen away
              
            },
            
            async beforeEnter(data) {
              ScrollTrigger.getAll().forEach((t) => t.kill());
              smoothScroll.destroy();

              initSmoothScroll(data.next.container);
              Webflow.destroy();
              Webflow.ready();
              Webflow.require("ix2").init();
            },
          },
        ],
      });
    }

    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end * 0.5;
    }

    function initSmoothScroll(container) {

      let options = {
        el: document.querySelector('#page-content'),
        smooth: true,
        getSpeed: true,
        getDirection: true,
        inertia: .5,
        multiplier: 1.5,
        mobile: {
          breakpoint: 0,
          smooth: true,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
        },
    }
  
    if(document.querySelector('#page-content').getAttribute('data-horizontal') == 'true') {
        options.direction = 'horizontal';
        options.gestureDirection = 'both';
        options.tablet = {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
        }
   
        options.reloadOnContextChange = true
    }

      smoothScroll = new LocomotiveScroll(options);


    
      smoothScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
          return arguments.length
            ? smoothScroll.scrollTo(value, 0, 0)
            : smoothScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },

        pinType: document.querySelector(".smooth-scroll").style.transform
          ? "transform"
          : "fixed",
      });

      const scrollbar = selectAll(".c-scrollbar");
      if (scrollbar.length > 1) {
        scrollbar[0].remove();
      }

                  gsap.set(".scroll_indicator_line", {xPercent:-100,} )
                  gsap.to(".scroll_indicator_line", {
                    xPercent: 0,
                    ease: 'none',
                    scrollTrigger: { 
                      trigger: ".main",
                      start: "top top",
                      scroller: ".smooth-scroll",
                      end:"bottom bottom",
                      endTrigger: ".footer_scroll",
                      scrub: 0.3 
                    }
                  });

      ScrollTrigger.addEventListener("refresh", () => smoothScroll.update());
      ScrollTrigger.refresh();
    }

    //////BARBA LOADER///////

    function initLoader() {
  
      const tlLoaderIn = gsap.timeline({
        id: "tlLoaderIn",
        
        defaults: {
          duration: 1.1,
          delay:.2,
          ease: "power2.out",
          
        },
       
        onComplete: () => initScript(),
        
      });


      tlLoaderIn

        .to(loaderInner, {
          scaleY: 1,
          transformOrigin: "bottom",
          ease: "power1.inOut",
        });

      const tlLoaderOut = gsap.timeline({
        id: "tlLoaderOut",
        defaults: {
          delay: .2,
          duration: .2,
          ease: "power2.inOut",
        },
      });

      tlLoaderOut.to(loader, { yPercent: -100 }, 0.2);

      const tlLoader = gsap.timeline();
      tlLoader.add(tlLoaderIn).add(tlLoaderOut);
    }

    function delay(n) {
      n = n || 2000;
      return new Promise((done) => {
        setTimeout(() => {
          done();
        }, n);
      });
    }

    /* Fire all scripts on page load*/
    function initScript() {
      select("body").classList.remove("is-loading");
    }
  }
  barba.use(barbaPrefetch);

  init();

  });








