let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
	//createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); //呼叫在ml5.js上的net函數，用此函數來判斷各位置，呼叫成功即執行function modelLoaded 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses); // 檢查偵測到的姿勢資料
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {   //顯示pose model已經準備就緒
  console.log('poseNet ready');
}

function draw() {
  background(0);
  image(noiseImg, 0, 0, width, height); // 測試是否正確顯示圖片
}

function drawKeypoints()  {  
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;//找出每一個點的x座標
      let y = pose.keypoints[i].position.y;//找出每一個點的y座標
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
	//print(pose.keypoints.length)
	}
function drawSkeleton()  {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];			
      strokeWeight(2);
      stroke(255,0,0);
      line(a.position.x, a.position.y,b.position.x,b.position.y);			
    }
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var mountainImg,landImg,noiseImg
function preload(){
	//mountainImg = loadImage("image211217.jpg")
	landImg= loadImage("landscape.jpg")
	noiseImg =loadImage("noise1.jpg")
}

