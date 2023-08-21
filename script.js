function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco()



function ab() {
    var tl = gsap.timeline();

    tl.from('nav img', {
        y: -200,
        opacity: 0,
        scale: 1.2,
        stagger: 1
    })
    tl.from('nav ul li', {
        y: -100,
        opacity: 0,
        stagger: 0.1
    })
    tl.from('.img img',{
        scale : 0,
        opacity : 0,
        stagger: 0.2,
        scrollTrigger:{
            scroller:'#main',
            trigger : '.img img',
            start : 'top 100%',
            end : 'top 20%',
             
            scrub : 1,
        }
    })
    tl.from('.row img',{
        x : -200,
        opacity: 0,
        delay : 0.5,
        stagger : 0.5,
        scrollTrigger:{
            scroller:'#main',
            trigger : '.row img',
            start : 'top 60%',
            end : 'top 40%',
             
            scrub : 2,
        }
    })
    tl.from('.row2 img',{
        x : 200,
        opacity: 0,
        delay : 0.5,
        stagger : 0.5,
        scrollTrigger:{
            scroller:'#main',
            trigger : '.row img',
            start : 'top 70%',
            end : 'top 40%',
            
            scrub : 2,
        }
    })
   
}

ab()



