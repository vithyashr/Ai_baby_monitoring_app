song = ""
objects = []
status1 = ""

function preload() {
    song = loadSound("alarm.mp3")
}

function setup() {
    Canvas = createCanvas(640, 420)
    Canvas.center()
    camera = createCapture(VIDEO)
    camera.size(640, 420)
    camera.hide()
    obj_detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = " Status: Detecting Objects"

}

function modelLoaded() {
    console.log("model loaded")
    status1 = true
    console.log("true")

}

function gotResult(error, results) {
    if (error) {
        console.log(error)

    }else{
        console.log(results)
        objects = results
    }
   

}

function draw() {
    image(camera, 0, 0, 640, 420)
    obj_detector.detect(camera, gotResult)
    if (status1 != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected"

            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + " % ", objects[i].x + 15, objects[i].y + 15)
            noFill("")
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == 'person') {
                document.getElementById("noo").innerHTML = "Baby Found ! "
                song.stop()
            } else {
                document.getElementById("noo").innerHTML = "Baby Not Found ! "
                song.play()

            }

            if (objects[i].length == 0) {
                document.getElementById("noo").innerHTML = "Baby Not Found ! "
                song.play()

            }
        }

    }

}