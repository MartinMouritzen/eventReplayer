/**
* Class that tracks events and turns them into JSON
*/
class EventPlayer {
	constructor() {
		this.delayBetweenActionsInMs = 250;
		
		this.currentElement = false;
	}
	/**
	* Play a recording list
	*/
	async play(recordingList) {
		for(var i=0;i<recordingList.length;i++) {
			this.playEvent(recordingList[i]);
			await this.timer(this.delayBetweenActionsInMs);
		}
	}
	timer(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
	/**
	* Plays an event
	*/
	playEvent(recordingEvent) {
		try {
			if (recordingEvent.eventType == 'focus') {
				var targetElement = this.getElementFromEvent(recordingEvent);
				targetElement.focus();
				this.currentElement = targetElement;
			}
			else if (recordingEvent.eventType == 'keyup') {
				this.currentElement.value = recordingEvent.value;
			}
			else if (recordingEvent.eventType == 'click') {
				var targetElement = this.getElementFromEvent(recordingEvent);
				if (targetElement.fireEvent) {
					targetElement.fireEvent('onclick');
				}
				else {
					var eventObject = document.createEvent('Events');
					eventObject.initEvent('click', true, false);
					targetElement.dispatchEvent(eventObject);
				}
			}
		}
		catch(exception) {
			console.log(exception);
			console.log(recordingEvent);
		}
	}
	/**
	* Tries to return an element on the page based on tagname, name, classname etc. in the event.
	*/
	getElementFromEvent(recordingEvent) {
		var element = false;
		if (recordingEvent.tagName) {
			if (recordingEvent.name) {
				element = document.querySelector(`${recordingEvent.tagName}[name=${recordingEvent.name}]`);
			}
			if (!element && recordingEvent.className) {
				element = document.querySelector(`${recordingEvent.tagName}[class=${recordingEvent.className}]`);
			}
			if (!element) {
				element = document.querySelector(`${recordingEvent.tagName}`);
			}
		}
		return element;
	}
}