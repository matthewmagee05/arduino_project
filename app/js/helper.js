const storage = require('electron-json-storage');
const $ = require('jQuery');

let iMovie = 0;
let iProblem = 0;
let data;
let answerText;
let imgOn;
let imgOff;
let correctMessage;
let wrongMessage;
let videoSrc;

function loadVideoForward(obj) {
	iProblem++;

	loadVideo(obj);
}

function loadVideoBackward(obj) {
	//iMovie;
	if (iProblem < 0) iProblem = 0;
	loadVideo(obj);
}

function loadVideo(obj) {
	console.log('Movie index: ' + iMovie);
	console.log('Problem index: ' + iProblem);

	$('#movie').load('video.pug', function() {
		$(document).ready(function() {
			console.log(obj.src);
			if (iMovie == 0) {
				$('#load_back').remove();
			}
			$('#myFrame').attr('src', obj.src);
			$('#titleBar').text(obj.title);
		});
	});
}

function loadFirstProblem(obj) {
	loadProblem(obj);
}

function loadProblemForward(obj) {
	iMovie++;

	loadProblem(obj);
}
function loadProblemBackward(obj) {
	iProblem--;
	loadProblem(obj);
}

function loadProblem(obj) {
	console.log('Movie index: ' + iMovie);
	console.log('Problem index: ' + iProblem);
	console.log(obj);
	$(document).ready(function() {
		$('#movie').load('problem.pug', function() {
			$('.nextButton').attr('disabled', 'true').addClass('disabled');
		});
	});
	console.log(obj.text);
	data = obj.text;
	answerText = obj.answer;
	imgOn = obj.imgOn;
	imgOff = obj.imgOff;
	correctMessage = obj.answerRightMessage;
	wrongMessage = obj.answerWrongMessage;
}

function replaceText(edit) {
	edit.setValue(data);
}

function checkAnswer(edit) {
	var editorValue = edit.getValue();
	var answer = answerText;

	if (editorValue.includes(answer)) {
		document.getElementById('led-status').src = imgOn;
		document.getElementById('message').innerHTML = correctMessage;
		$('.nextButton').removeAttr('disabled').removeClass('disabled');
	} else {
		document.getElementById('led-status').src = imgOff;
		document.getElementById('message').innerHTML = wrongMessage;
		$('.nextButton').attr('disabled', 'true').addClass('disabled');
	}
}
