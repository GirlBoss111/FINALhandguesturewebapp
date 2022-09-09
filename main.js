prediction_1 = "";

prediction_2 = "";


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90,
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takephoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kUwQoSqyI/model.json',modelloaded);
function modelloaded(){
    console.log("modelloaded");
}

function check(){
    image=document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is " + prediction_1;
    speak_data_2="And the second prediction is " + prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error, results){
    if (error){
        console.log("error");
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label=="Like"){
        document.getElementById("updated_emoji").innerHTML="👍";
        }
        if(results[0].label=="Dislike"){
            document.getElementById("updated_emoji").innerHTML="👎";
        }
        if(results[0].label=="HalfAHeart"){
            document.getElementById("updated_emoji").innerHTML="🤞";
        }
        if(results[1].label=="Like"){
            document.getElementById("updated_emoji2").innerHTML="👍";
            }
        if(results[1].label=="Dislike"){
                document.getElementById("updated_emoji2").innerHTML="👎";
            }
            if(results[1].label=="HalfAHeart"){
                document.getElementById("updated_emoji2").innerHTML="🤞";
            }
    }
}