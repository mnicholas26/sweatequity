window.onload = () => {
    setInterval(() => {
        document.getElementById('svg_arrows').setAttribute('start', true);
    }, 3000);
    let hand = document.getElementById('svg_hand');
    hand.svg = document.querySelector('#page1 > svg');
    hand.setAttribute('drag', false);
    hand.addEventListener('mousedown', (e) => {
        let origin = getMousePosition(e, hand.svg);
        hand.y = origin.y;
        hand.setAttribute('drag', true);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseleave', enddrag);
        document.addEventListener('mouseup', enddrag);

        function drag(e){
            let pos = getMousePosition(e, hand.svg);
            if(pos.y - origin.y < -450){
                console.log('end');
                enddrag(false);
            }
            if(pos.y < hand.y){
                hand.y = pos.y;
                hand.setAttribute('transform', `translate(0, ${pos.y - origin.y})`);
            }
        }

        function enddrag(flag){
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseleave', enddrag);
            document.removeEventListener('mouseup', enddrag);
            if(!flag){
                document.getElementById('page1').style.bottom = '100%';
            }
            else {
                
                let step = 10;
                let timer = setInterval(() => {
                    hand.y += step;
                    if(hand.y - origin.y > 0){
                        clearInterval(timer);
                        hand.setAttribute('transform', `translate(0, 0)`);
                        hand.setAttribute('drag', false);
                    } else {
                        hand.setAttribute('transform', `translate(0, ${hand.y - origin.y})`);
                    }
                }, 10);
            }
        }
    });

    function getMousePosition(evt, svg) {
        var CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
    }
}