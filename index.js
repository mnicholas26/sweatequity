window.onload = () => {
    let time = new Date().toLocaleString();
    let timereg = /[\d]*:[\d]*:[\d]*/;
    time = time.match(timereg);
    console.log(time);
    time = time[0].split(':');
    if(time[0] >= 21 || time[0] <= 6) {
        document.body.classList.replace('light', 'dark');
        document.getElementById('modeToggle').children[1].classList.toggle('on');
    }

    let modetoggle = document.getElementById('modeToggle');
    modetoggle.children[1].addEventListener('click', () => {
        modetoggle.children[1].classList.toggle('on');
        document.body.classList.toggle('light');
        document.body.classList.toggle('dark');
    })

    let title = document.getElementById('logo');
    let page = document.getElementById('splash');
    let h = page.clientHeight, w = page.clientWidth;
    title.bbox = title.getBoundingClientRect();
    title.style.textShadow = '#1e1527 20px 20px 10px';
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
    document.addEventListener('mousemove', (e) => {
        //check if on screen
        let pos = {x: e.pageX, y: e.pageY};
        // if(pos.x > (title.centre.x - (0.4*w)) && 
        //     pos.x < (title.centre.x + (0.4*w)) &&
        //     pos.y < (title.centre.y + (0.4*h)) &&
        //     pos.y > (title.centre.y - (0.4*h))){
        //         let projection = project(pos, title.centre, 0.09);
        //         title.style.transform = `translate(${projection.x.toFixed(1)}px, ${projection.y.toFixed(1)}px)`;
        // } else {
        //     title.style.transform = '';
        // }
        let colour = getComputedStyle(document.body).getPropertyValue('--shadow');
        if(window.scrollY < h){
            let projection = project(pos, title.centre, 0.005);
            title.style.transform = `translate(${projection.x.toFixed(1)}px, ${projection.y.toFixed(1)}px)`;
            let umbra = 1.5 * Math.max(6, .7*Math.sqrt(Math.pow(projection.x, 2) + Math.pow(projection.y, 2)));
            title.style.textShadow = `${colour} ${.7*projection.x.toFixed(1)}px ${.7*projection.y.toFixed(1)}px ${umbra}px`;
        }
    });

    setTimeout(() => {
        let termtitle = document.querySelector('#title .termtext > span');
        termtitle.textContent = "";
        let text = "elbow ventures";
        let counter = 0;
        let timer = setInterval(() => {
            if(counter == text.length) {
                clearInterval(timer);
                // setTimeout(() => {
                //     termtitle.parentElement.classList.replace("termtext", "termover");
                // }, 4000);
            } else {
                termtitle.textContent += text.charAt(counter);
                counter++;
            }
        }, 150);
    }, 1000);
    // const canvas = document.getElementById('pong');
    // const context = canvas.getContext('2d');
    // const grid = 15;
    // const paddleHeight = grid * 5; // 80
    // const maxPaddleY = canvas.height - grid - paddleHeight;
    // const colour = '#ffbf7d';

    // var paddleSpeed = 6;
    // var ballSpeed = 2;

    // const leftPaddle = {
    // // start in the middle of the game on the left side
    // x: grid * 2,
    // y: canvas.height / 2 - paddleHeight / 2,
    // width: grid,
    // height: paddleHeight,

    // // paddle velocity
    // dy: 0
    // };
    // const rightPaddle = {
    // // start in the middle of the game on the right side
    // x: canvas.width - grid * 3,
    // y: canvas.height / 2 - paddleHeight / 2,
    // width: grid,
    // height: paddleHeight,

    // // paddle velocity
    // dy: 0
    // };
    // const ball = {
    // // start in the middle of the game
    // x: canvas.width / 2,
    // y: canvas.height / 2,
    // width: grid,
    // height: grid,

    // // keep track of when need to reset the ball position
    // resetting: false,

    // // ball velocity (start going to the top-right corner)
    // dx: ballSpeed,
    // dy: -ballSpeed
    // };

    // // check for collision between two objects using axis-aligned bounding box (AABB)
    // // @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // function collides(obj1, obj2) {
    // return obj1.x < obj2.x + obj2.width &&
    //         obj1.x + obj1.width > obj2.x &&
    //         obj1.y < obj2.y + obj2.height &&
    //         obj1.y + obj1.height > obj2.y;
    // }

    // // game loop
    // function loop() {
    //     requestAnimationFrame(loop);
    //     context.clearRect(0,0,canvas.width,canvas.height);

    //     // move paddles by their velocity
    //     leftPaddle.y += leftPaddle.dy;
    //     rightPaddle.y += rightPaddle.dy;

    //     // prevent paddles from going through walls
    //     if (leftPaddle.y < grid) {
    //         leftPaddle.y = grid;
    //     }
    //     else if (leftPaddle.y > maxPaddleY) {
    //         leftPaddle.y = maxPaddleY;
    //     }

    //     if (rightPaddle.y < grid) {
    //         rightPaddle.y = grid;
    //     }
    //     else if (rightPaddle.y > maxPaddleY) {
    //         rightPaddle.y = maxPaddleY;
    //     }

    //     // draw paddles
    //     context.fillStyle = colour;
    //     context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    //     context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    //     // move ball by its velocity
    //     ball.x += ball.dx;
    //     ball.y += ball.dy;

    //     // prevent ball from going through walls by changing its velocity
    //     if (ball.y < grid) {
    //         ball.y = grid;
    //         ball.dy *= -1;
    //     }
    //     else if (ball.y + grid > canvas.height - grid) {
    //         ball.y = canvas.height - grid * 2;
    //         ball.dy *= -1;
    //     }

    //     // reset ball if it goes past paddle (but only if we haven't already done so)
    //     if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
    //         ball.resetting = true;

    //         // give some time for the player to recover before launching the ball again
    //         setTimeout(() => {
    //         ball.resetting = false;
    //         ball.x = canvas.width / 2;
    //         ball.y = canvas.height / 2;
    //         }, 400);
    //     }

    //     // check to see if ball collides with paddle. if they do change x velocity
    //     if (collides(ball, leftPaddle)) {
    //         ball.dx *= -1;

    //         // move ball next to the paddle otherwise the collision will happen again
    //         // in the next frame
    //         ball.x = leftPaddle.x + leftPaddle.width;
    //     }
    //     else if (collides(ball, rightPaddle)) {
    //         ball.dx *= -1;

    //         // move ball next to the paddle otherwise the collision will happen again
    //         // in the next frame
    //         ball.x = rightPaddle.x - ball.width;
    //     }

    //     // draw walls
    //     context.fillStyle = colour;
    //     context.fillRect(0, 0, canvas.width, grid);
    //     context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

    //     // draw dotted line down the middle
    //     for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    //         if(i < canvas.height/4 || i > canvas.height*2.8/4) context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    //     }

    //     // draw ball
    //     context.fillStyle = 'white';
    //     context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // }

    // // listen to keyboard events to move the paddles
    // document.addEventListener('keydown', e => {
    //     e.preventDefault();
    //     switch (e.key) {
    //         case 'ArrowUp':
    //             rightPaddle.dy = -paddleSpeed;
    //             break;
    //         case 'ArrowDown':
    //             rightPaddle.dy = paddleSpeed;
    //             break;
    //         case 'w':
    //             leftPaddle.dy = -paddleSpeed;
    //             break;
    //         case 's':
    //             leftPaddle.dy = paddleSpeed;
    //             break;
            
    //         default:
    //             break;
    //     }
    // });

    // // listen to keyboard events to stop the paddle if key is released
    // document.addEventListener('keyup', function(e) {
    // if (e.which === 38 || e.which === 40) {
    //     rightPaddle.dy = 0;
    // }

    // if (e.which === 83 || e.which === 87) {
    //     leftPaddle.dy = 0;
    // }
    // });

    // // start the game
    // requestAnimationFrame(loop);
}