var basicStash = [
	"DRAWN","FEELINGS","OVERNIGHT","HABITAT","PIRATE"
];

var parts = [
	"Head", "Body", "LeftArm", "RightArm", "LeftLeg", "RightLeg"
];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var settings = {
	sound: {on:true,vol:0.5},
	cheats: false,
	splash: true
}

var lsStash = {
	0: {word:"",used:false,index:0},
	1: {word:"habitat",used:true,index:3}
}

var userdata = {
	level: 1,
	levels: {
		0: {stars:1,completed:false}
	}, 
	wordCount: 0
}