//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================



// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Audio = require('Audio');
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');
const Reactive = require('Reactive');

// Store a reference to a detected face
const face = FaceTracking.face(0);

// How to access scene objects
const directionalLight = Scene.root.find('directionalLight0');

// How to access class properties
const directionalLightIntensity = directionalLight.intensity;

var currentClip = 0;

// How to log messages to the console (uncomment line below to activate)
//Diagnostics.log('I am a console message logged from the script');

var values = 3;

function findSounds(){
var clips = [];
for(var i = 0; i<values; i++){
        var speaker = Audio.getPlaybackController('audioPlaybackController'+i);//Scene.root.find('speaker'+i);
        clips.push(speaker);
    }
    return clips;
}

var speakerList = findSounds();
//Diagnostics.log(speakerList.length);
speakerList[currentClip].play();


FaceGestures.isTurnedRight(face).monitor().subscribe(function(){
    speakerList[currentClip].stop();
    currentClip++;
    if( currentClip == values)
        currentClip = 0;
    speakerList[currentClip].play();
});

FaceGestures.isTurnedLeft(face).monitor().subscribe(function(){
    speakerList[currentClip].stop();
    currentClip--;
    if(currentClip==-1)
        currentClip =values-1;
    speakerList[currentClip].play();
});


/*FaceGestures.onShake(face).subscribe(function() {
    Diagnostics.log(speakerList.length);
    
    speakerList[currentClip].stop();
    if(isLeft) currentClip--;
    else if(isRight) currentClip++;
    if(currentClip==-1)
        currentClip =values-1;
    else if( currentClip == values)
        currentClip = 0;
    speakerList[currentClip].play();
});*/

/*const TouchGestures = require('TouchGestures');

// Locate the playback controller in the Assets
const playbackController =
Audio.getPlaybackController('Audio Playback Controller');

// Loop the playback controller
playbackController.loop();

//==============================================================================
// Start and stop the audio by tapping on the screen
//==============================================================================

// Create a boolean to determine if the audio is playing
var isAudioPlaying = true;

// Subscribe to tap gestures on the screen
TouchGestures.onTap().subscribe(function() {

  // If the audio is stopped, play it, if it's playing, stop it
  if (!isAudioPlaying) {
    playbackController.play();
  } else {
    playbackController.stop();
  }

  // Update the boolean
  isAudioPlaying = !isAudioPlaying;

}); */

