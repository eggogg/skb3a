import 'isomorphic-fetch';
import express from 'express';
import cors from 'cors';
import Promise from 'bluebird';
import bodyParser from 'body-parser';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
fetch(pcUrl)
	.then ( async (res) => {
		pc = await res.json();
	})
	.catch ( err => {
		console.log('Что-то пошло не так:', err)
	});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => { return res.json(pc); });
app.get('/board', async (req, res) => { return res.json(pc.board); });
app.get('/board/vendor', async (req, res) => { return res.json(pc.board.vendor); });
app.get('/board/model', async (req, res) => { return res.json(pc.board.model); });
app.get('/board/cpu', async (req, res) => { return res.json(pc.board.cpu); });
app.get('/board/cpu/model', async (req, res) => { return res.json(pc.board.cpu.model); });
app.get('/board/cpu/hz', async (req, res) => { return res.json(pc.board.cpu.hz); });
app.get('/board/image', async (req, res) => { return res.json(pc.board.image); });
app.get('/board/video', async (req, res) => { return res.json(pc.board.video); });
app.get('/ram', async (req, res) => { return res.json(pc.ram); });
app.get('/ram/vendor', async (req, res) => { return res.json(pc.ram.vendor); });
app.get('/ram/volume', async (req, res) => { return res.json(pc.ram.volume); });
app.get('/ram/pins', async (req, res) => { return res.json(pc.ram.pins); });
app.get('/os', async (req, res) => { return res.json(pc.os); });
app.get('/floppy', async (req, res) => { return res.json(pc.floppy); });
app.get('/hdd', async (req, res) => { return res.json(pc.hdd); });
app.get('/monitor', async (req, res) => { return res.json(pc.monitor); });
app.get('/length', async (req, res) => { return res.json(pc["length"]); });
app.get('/width', async (req, res) => { return res.json(pc.width); });
app.get('/height', async (req, res) => { return res.json(pc.height); });
app.get('/hdd/0', async (req, res) => { return res.json(pc.hdd[0]); });
app.get('/hdd/1', async (req, res) => { return res.json(pc.hdd[1]); });
app.get('/hdd/2', async (req, res) => { return res.json(pc.hdd[2]); });
app.get('/hdd/0/vendor', async (req, res) => { return res.json(pc.hdd[0].vendor); });
app.get('/hdd/1/vendor', async (req, res) => { return res.json(pc.hdd[1].vendor); });
app.get('/hdd/2/vendor', async (req, res) => { return res.json(pc.hdd[2].vendor); });
app.get('/hdd/0/size', async (req, res) => { return res.json(pc.hdd[0].size); });
app.get('/hdd/1/size', async (req, res) => { return res.json(pc.hdd[1].size); });
app.get('/hdd/2/size', async (req, res) => { return res.json(pc.hdd[2].size); });
app.get('/hdd/0/volume', async (req, res) => { return res.json(pc.hdd[0].volume); });
app.get('/hdd/1/volume', async (req, res) => { return res.json(pc.hdd[1].volume); });
app.get('/hdd/2/volume', async (req, res) => { return res.json(pc.hdd[2].volume); });

app.get('/volumes', async (req, res) => { 
	const volumes = pc.hdd;
	var tv = new Object();
	for (var i = 0; i < volumes.length; i++ ) {
		if ( tv[volumes[i].volume] === undefined ) {
			tv[volumes[i].volume] = volumes[i].size;
		} else {
			tv[volumes[i].volume] += volumes[i].size;
		}
	}
	for (var volname in tv) {
		tv[volname] = tv[volname] + 'B';
	}
	return res.json(tv); 

});

app.use(function(req, res, next) {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
	console.log('App listening on port 3000');
})











/*
function hello(name) {
  console.log(`Hello ${name}`); // eslint-disable-line
}
hello('JS World');
*/