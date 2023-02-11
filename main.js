marvel = "";
hp = "";
leftWristX = 0;
leftWristY = 0;
songstatus = "";
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload(){
    marvel = loadSound("Marvel Opening Theme.mp3");
    hp = loadSound("Harry Potter Theme Song.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(500, 175);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log('PoseNet has started');
}

function gotPoses(results){

    if(results.length > 0){

        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);



        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;


        console.log("Left Wrist X = "+leftWristX);
        console.log("Left Wrist Y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X = "+rightWristX);
        console.log("Right Wrist Y = "+rightWristY);
    }


}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('#F0B0EB');
    stroke('#373537');

    songstatus = marvel.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        hp.stop();

        if(songstatus == "false"){
            marvel.play();
            document.getElementById("songname").innerHTML = "Marvel Theme Song";
        }
    }
}