window.onload = () => {

    let mode = localStorage.getItem('modeValue');
    if(mode){
        let olddate = localStorage.getItem('modeDate');
        olddate = new Date(olddate);
        let newdate = new Date();
        if(((newdate - olddate) / (1000 * 3600 * 24)) >= 1){
            localStorage.clear();
            autoMode();
        } else if(mode == 'dark'){
            document.body.classList.replace('light', 'dark');
            document.getElementById('modeToggle').children[1].classList.toggle('on');
        }
    } else autoMode()

    function autoMode(){
        let date = new Date();
        let time = date.toLocaleString();
        let timereg = /[\d]*:[\d]*:[\d]*/;
        time = time.match(timereg);
        time = time[0].split(':');
        if(time[0] >= 21 || time[0] <= 6) {
            document.body.classList.replace('light', 'dark');
            document.getElementById('modeToggle').children[1].classList.toggle('on');
        }
    }

    let modetoggle = document.getElementById('modeToggle');
    modetoggle.children[1].addEventListener('click', () => {
        modetoggle.children[1].classList.toggle('on');
        document.body.classList.toggle('light');
        document.body.classList.toggle('dark');
        localStorage.setItem('modeValue', document.body.className);
        localStorage.setItem('modeDate', new Date().toString());
    });

    let title = document.getElementById('mlogo');
    title.bbox = title.getBoundingClientRect();
    title.colour = getComputedStyle(document.body).getPropertyValue('--shadow');
    title.style.textShadow = `${title.colour} 2px 2px 10px`;
    title.centre = {
        x: title.bbox.x + (title.bbox.width/2),
        y: title.bbox.y + (title.bbox.height/2)
    }

    function project(p, c, scale){
        return {
            x: (p.x - c.x) * -scale,
            y: (p.y - c.y) * -scale
        }
    }

    function logoprojection(e){
        let pos = {x: e.pageX, y: e.pageY};
        let projection = project(pos, title.centre, 0.005);
        title.style.transform = `translate(${projection.x.toFixed(1)}px, ${projection.y.toFixed(1)}px)`;
        let umbra = 1.5 * Math.max(6, .7*Math.sqrt(Math.pow(projection.x, 2) + Math.pow(projection.y, 2)));
        title.style.textShadow = `${title.colour} ${.7*projection.x.toFixed(1)}px ${.7*projection.y.toFixed(1)}px ${umbra}px`;
    }

    setTimeout(() => {
        let termtitle = document.querySelector('#title .termtext > span');
        termtitle.textContent = "";
        let text = "elbow ventures ";
        let counter = 0;
        let timer = setInterval(() => {
            if(counter == text.length) {
                clearInterval(timer);
                logoPlay();
                // setTimeout(() => {
                //     termtitle.parentElement.classList.replace("termtext", "termover");
                // }, 4000);
            } else {
                termtitle.textContent += text.charAt(counter);
                counter++;
            }
        }, 150);
    }, 1000);

    let pobserver = new IntersectionObserver((entries) => {
        for(const entry of entries){
            if(entry.isIntersecting){
                entry.target.classList.remove('moveup', 'movedown');
                entry.target.classList.add('fadein');
            } else {
                entry.target.classList.remove('fadein');
                if(entry.boundingClientRect.y < window.innerHeight / 2) entry.target.classList.add('moveup');
                else entry.target.classList.add('movedown');
            }
        }
    }, {threshold: 0.11});

    let pgraphs = document.querySelectorAll('.paragraphWrapper');
    for(const pgraph of pgraphs){
        pobserver.observe(pgraph);
    }

    let logoobserver = new IntersectionObserver((entries) => {
        let logo = entries[0];
        if(logo.isIntersecting) {
            title.bbox = title.getBoundingClientRect();
            title.centre = {
                x: title.bbox.x + (title.bbox.width/2),
                y: title.bbox.y + (title.bbox.height/2)
            }
            title.colour = getComputedStyle(document.body).getPropertyValue('--shadow');
            document.addEventListener('mousemove', logoprojection);
        } else {
            document.removeEventListener('mousemove', logoprojection);
            title.style.transform = `translate(0px, 0px)`;
            title.style.textShadow = `${title.colour} 2px 2px 10px`;

        }
    });

    logoobserver.observe(title);

    function logoPlay(element = title, time = 40, order = [0,1,1,2,2,2,2,2,2,1,1,0]){
        let counter = 0;
        let timer = setInterval(() => {
            if(counter >= order.length) {
                clearInterval(timer);
                return;
            } else {
                element.setAttribute('frame', order[counter]);
                counter++;
            }
        }, time);

    }

    title.addEventListener('click', () => {logoPlay()});
    let flogo = document.getElementById('flogo')
    flogo.addEventListener('click', () => {logoPlay(flogo)});
}