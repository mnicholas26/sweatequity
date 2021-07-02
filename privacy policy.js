window.onload = () => {
    let mode = localStorage.getItem('modeValue');
    if(mode){
        let olddate = localStorage.getItem('modeDate');
        olddate = new Date(olddate);
        let newdate = new Date();
        if(((newdate - olddate) / (1000 * 3600 * 24)) >= 1){
            localStorage.clear();
        } else if(mode == 'dark'){
            document.body.classList.replace('light', 'dark');
        }
    }

    let date = new Date();
    let time = date.toLocaleString();
    let timereg = /[\d]*:[\d]*:[\d]*/;
    time = time.match(timereg);
    time = time[0].split(':');
    if(time[0] >= 21 || time[0] <= 6) {
        document.body.classList.replace('light', 'dark');
    }
}