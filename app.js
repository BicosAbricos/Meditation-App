const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    let input = document.querySelector(".input");

    //Sounds

    const sounds = document.querySelectorAll('.sound-picker button');

    //Time display 

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    //Get the lenght of the outline

    const outlineLength = outline.getTotalLength();

    console.log(outlineLength);

    //Duration

    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    input.addEventListener('blur', () => {
        fakeDuration = input.value*60;
        input.value += " minutes";
        input.readonly = true

    })

    input.addEventListener("click",function(){
        console.log(Math.floor(fakeDuration%60));
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        
    })

    input.addEventListener('dblclick', () => {
        console.log("HEUEUEUEU");
        input.readonly = false;
        input.value = " "
    })
    //Pick different sounds

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song);
        });
    });


    //play sound


    play.addEventListener('click', () => {
        checkPlaying(song);

    });

    //Select sound

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`

        });
    });

    //Create a function  specific to stop and play the sounds


    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = 'pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = 'play.svg';
        }
    }


    //We can animate the circle
    song.ontimeupdate = () => {
        let currrentTime = song.currentTime;
        let elapsed = fakeDuration - currrentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);


        //Animate the circle

        let progress = outlineLength - (currrentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;



        //Animate the text

        timeDisplay.textContent = `${minutes}:${seconds<10?"0"+seconds:seconds}`;


        if (currrentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = 'play.svg';
            video.pause();
        }
    };
}


app();
