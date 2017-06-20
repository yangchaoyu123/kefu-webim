window.app = {};

app.Dict = (function () {
	var Dict = function () {
		this.list = {};
	};

	Dict.prototype.set = function (key, value) {
		if (typeof this.list[key] === 'undefined') {
			this.list[key] = value;
		}
	};

	Dict.prototype.get = function (key) {
		if (this.list.hasOwnProperty(key)) {
			return this.list[key];
		}
		else {
			return null;
		}
	};

	Dict.prototype.remove = function (key) {
		if (typeof this.list[key] !== 'undefined') {
			delete this.list[key];
		}
	};

	return Dict;
}());

app.List = (function(){
	var List = function (){
		this.list = [];
	};

	List.prototype.add = function (value){
		if (!~this.list.indexOf(value)){
			this.list.push(value);
		}
	};

	List.prototype.remove = function (value){
		var index = this.list.indexOf(value);
		if (index >= 0){
			this.list.splice(index, 1);
		}
	};

	List.prototype.getAll = function (){
		return this.list;
	};

	return List;
}());

app.Poller = (function () {
	var Poller = function (fn, interval) {
		this.fn = fn;
		this.isStarted = false;
		this.timerHandler = null;
		this.interval = interval;
	};

	Poller.prototype.start = function () {
		if (!this.isStarted) {
			this.isStarted = true;
			setTimeout(this.fn, 0);
			this.timerHandler = setInterval(this.fn, this.interval);
		}
	};

	Poller.prototype.stop = function () {
		if (this.isStarted) {
			this.isStarted = false;
			clearInterval(this.timerHandler);
		}
	};

	Poller.prototype.isStarted = function () {
		return this.isStarted;
	};

	return Poller;
}());

app.profile = {
	ctaEnable: false,
	currentAgentAvatar: null,
	currentAgentNickname: null,
	isChatWindowOpen: null,
	nickNameOption: null,
	currentBrowsingURL: null,
	// 用来缓存图片的file对象，用于全屏查看图片
	imgFileList: new app.Dict(),
	hasHumanAgentOnline: false,
	hasRobotAgentOnline: false,
	officialAccountList: [],
	commandMessageToBeSendList: [],
	tenantAvatar: null,
	defaultAvatar: null,
	currentOfficialAccount: {},
	systemOfficialAccount: {}
};