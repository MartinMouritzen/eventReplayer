/**
* Class that tracks events and turns them into JSON
*/
class EventRecorder {
	/**
	* Initialization of the recorder.
	*/
	constructor() {
		this.isRecording = false;
		
		this.recordingList = [];
		
		document.addEventListener('click',(event) => { this.handleEvent('click',event); });
		document.addEventListener('keyup',(event) => { this.handleEvent('keyup',event); });
		document.addEventListener('focusin',(event) => { this.handleEvent('focus',event); });
		
		this.handleEvent = this.handleEvent.bind(this);
	}
	/**
	* Handle our different events
	*/
	handleEvent(eventType,event) {
		if (!this.isRecording) {
			return;
		}
		var target = event.srcElement;
		
		// We don't want to track our own buttons
		if (target.className == 'recordIgnore') {
			return;
		}
		
		var eventRecord = {};
		eventRecord.eventType = eventType;

		eventRecord.tagName = target.tagName;
		eventRecord.id = target.id;
		eventRecord.name = target.name;
		eventRecord.className = target.className;

		if (eventType == 'focus') {

			
		}
		else if (eventType == 'click') {
			eventRecord.clientX = event.clientX;
			eventRecord.clientY = event.clientY;
		}
		else if (eventType == 'keyup') {
			eventRecord.key = event.key;
			eventRecord.value = target.value ? target.value : '';
		}
		
		this.recordingList.push(eventRecord);
		
		this.showEventInTextarea(eventRecord);
	}
	showEventInTextarea() {
		document.getElementById('debug').value = JSON.stringify(this.recordingList);
	}
	/**
	* Start recording
	*/
	record() {
		// Reset recordings
		this.recordingList = [];

		this.isRecording = true;
	}
	/**
	* Stop recording
	*/
	stop() {
		this.isRecording = false;
	}
}