
    function scrollEvent() {
        const obj = document.querySelector('header');
        const pos_y = window.pageYOffset;
        if (pos_y > 0) {
            obj.classList.add('fixed');
        } else {
            obj.classList.remove('fixed');
        }

        const obj2 = document.querySelector('#fixed-banner > a:last-of-type');
        const obj2_y = document.documentElement.scrollHeight - (window.innerHeight - obj2.getBoundingClientRect().top + obj2.clientHeight * 2);
        const pos_y2 = window.pageYOffset + window.innerHeight;
        if (pos_y2 > obj2_y) {
            obj2.classList.add('hide');
        } else {
            obj2.classList.remove('hide');
        }
    }

    window.addEventListener('load', function() {
        scrollEvent();
    });

    window.addEventListener('scroll', function() {
        scrollEvent();
    });

    // loading setup
    let promise1;
    let promise2;
    let is_home = false;
    let video;
    if (is_home) {
        video = document.getElementById('top-movie');
        video.pause();
        promise1 = new Promise( (resolve, reject) => {
            const f1 = () => {
                resolve();
            }
            ;
            video.addEventListener('canplaythrough', f1);
            video.addEventListener('loadeddata', f1);
            const f2 = () => {
                reject();
            }
            ;
            video.addEventListener('error', f2);
            video.addEventListener('stalled', f2);
        }
        );
        video.load();
    }
    promise2 = new Promise( (resolve, reject) => {
        const imgload = imagesLoaded('body', {
            background: true
        }, function() {
            resolve();
        });
        imgload.on('fail', function() {
            reject();
        });
    }
    );
    promise3 = new Promise( (resolve, reject) => {
        let svg = document.createElement('img');
        svg.src = '/wp-content/themes/akatuka/src/akatuka-catchcopy-script.svg';
        svg.addEventListener('load', function() {
            resolve();
        });
        svg.addEventListener('error', function() {
            reject();
        });
    }
    );
    promise4 = new Promise( (resolve, reject) => {
        let svg = document.createElement('img');
        svg.src = '/wp-content/themes/akatuka/src/akatuka-catchcopy-script-stroke.svg';
        svg.addEventListener('load', function() {
            resolve();
        });
        svg.addEventListener('error', function() {
            reject();
        });
    }
    );

    if (is_home) {
        Promise.all([promise1, promise2, promise3, promise4]).then( () => {
            setTimeout( () => {
                video = document.getElementById('top-movie');
                setTimeout( () => {
                    video.play();
                }
                , 1000);
                document.body.classList.add('show');
            }
            , 0);
        }
        ).catch( (reasons) => {
            setTimeout( () => {
                const video = document.getElementById('top-movie');
                setTimeout( () => {
                    video.play();
                }
                , 1000);
                document.body.classList.add('show');
            }
            , 0);
        }
        );
    } else {
        Promise.all([promise2]).then( () => {
            setTimeout( () => {
                document.body.classList.add('show');
            }
            , 0);
        }
        ).catch( (reasons) => {
            setTimeout( () => {
                document.body.classList.add('show');
            }
            , 0);
        }
        );
    }
    ;
    const scroll_objs = document.querySelectorAll('.scroll-wrap');
    scroll_objs.forEach( (elm) => {
        elm.addEventListener('scroll', (e) => {
            e.target.classList.add('touched');
        }
        );
        elm.addEventListener('touchstart', (e) => {
            e.target.classList.add('touched');
        }
        );
    }
    );

    new Swiper('#drawer-slider',{
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 3000,
        },
        speed: 1000,
        allowTouchMove: false
    });

    const luminousOpts = {};
    let luminousTrigger = document.querySelectorAll('.luminous');
    if (luminousTrigger !== null) {
        new LuminousGallery(luminousTrigger,{},luminousOpts);
    }