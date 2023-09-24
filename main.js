song1_name = "Lambo Flow";
song2_name = "Peter Pan";
statusSong1 = "";
statusSong2 = "";
scoreLeftWristY = "0";
scoreRightWristY = "0";
playSong = "";
song1 = "";
song2 = "";
leftWristY = "";
leftWristX = "";
rightWristY = "";
rightWristX = "";
function preload() {
    song1 = loadSound("songy.mp3");
    song2 = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    machine = ml5.poseNet(camera, loadModal);
    machine.on("pose", gotResult);
}
function loadModal() {
    console.log("Modal is loaded");
}
function gotResult(result) {
    if (result.length > 0) {
        console.log(result)
        leftWristY = result[0].pose.leftWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        console.log("leftWristY = " + leftWristY);
        console.log("leftWristX = " + leftWristX);
        console.log("rightWristY = " + rightWristY);
        console.log("rightWristX = " + rightWristX);
        scoreLeftWristY = result[0].pose.keypoints[9].score;
        console.log("the left score is = " + scoreLeftWristY);
        scoreRightWristY = result[0].pose.keypoints[10].score;
        console.log("the right score is = " + scoreRightWristY);
    }
}
function draw() {
    image(camera, 0, 0, 400, 400);
    stroke("red");
    fill("red");
    statusSong1 = song1.isPlaying();
    if (scoreLeftWristY > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }
    if (statusSong1 == false) {
        song1.play();
        document.getElementById("song").innerHTML = song1_name;
    }
    statusSong2 = song2.isPlaying();
    if (scoreRightWristY > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
    }
    if (statusSong2 == false) {
        song2.play();
        document.getElementById("song").innerHTML = song2_name;
    }
}