function initMaze(level) {
	console.time('a');
	let size = {
		'easy': 21,
		'normal': 31,
		'hard': 41,
		'lunatic': 51,
		'extra': 99
	}
	let mazeWidth = size[level];
	let mazeHeight = size[level];
	let startX;
	let endX;
	while(startX %2 !== 1) startX = Math.floor(Math.random()*(mazeWidth - 2)) + 1;
	while(endX %2 !== 1) endX = Math.floor(Math.random()*(mazeWidth - 2)) + 1;
	let mat = builtMaze(mazeWidth, mazeHeight);
	let getRoad = searchRoad(mat);
	printMap(mat, getRoad);
	console.timeEnd('a');
	
	function printMap(mat, getRoad){
		
		let road = getRoad[0];
		for (let i = 0; i < road.length - 1; i++){
			if (road[i + 1].y - road[i].y === 1) mat[road[i].y][road[i].x] = '↓';
			if (road[i + 1].y - road[i].y === -1) mat[road[i].y][road[i].x] = '↑';
			if (road[i + 1].x - road[i].x === 1) mat[road[i].y][road[i].x] = '→';
			if (road[i + 1].x - road[i].x === -1) mat[road[i].y][road[i].x] = '←';
		}
		mat[road[road.length - 1].y][road[road.length - 1].x] = '↑'
		
	
		buildDOM();
	
		function buildDOM() {
			let mazeMap = mat.map(row => row.join(''));
			let mazeWrapper = document.createElement('div');
			mazeWrapper.className = 'mazeWrapper';
			for (let i = 0; i < mazeMap.length; i++) {
				let row = document.createElement('div');
				for(let j = 0; j < mazeMap[i].length; j++) {
					let word = document.createElement('div');
					switch (mazeMap[i][j]) {
						case '路': 
							word.className = 'road';
							break;
						case '墙': 
							word.className = 'wall';
							break;
						case '起':
							word.className = 'start';
							break;
						case '终':
							word.className = 'end';
							break;
						case '↑':
							word.className = 'up';
							break;
						case '↓':
							word.className = 'down';
							break;
						case '←':
							word.className = 'left';
							break;
						case '→':
							word.className = 'right';
							break;
					}
					row.appendChild(word);
				}
				row.className = 'mazeRow';
				mazeWrapper.appendChild(row);
			}
			let body = document.querySelector('body');
			body.appendChild(mazeWrapper)
		}
	}
	
	function builtMaze(x, y){
		let mat = [];
		for(let i = 0; i < y; i++) {
			mat[i] = [];
			for(let j = 0; j < x; j++){
				mat[i].push('路');
			}
		}
	
		for(let i = 0; i < y; i += y - 1){
			for (let j = 0; j < x; j++){
				mat[i][j] = '墙';
			}
		}
		for(let i = 0; i < x; i += x - 1){
			for(let j = 0; j < y; j++){
				mat[j][i] = '墙';
			}
		}
	
		mat[y - 1][startX] = '起';
		mat[0][endX] = '终';
	
		let currentEvenArr = [];
		for(let i = 0; i < y; i += y - 1){
			for (let j = 2; j < x - 1; j += 2){
				currentEvenArr.push({y: i, x: j});
			}
		}
		for(let i = 0; i < x; i += x - 1){
			for(let j = 2; j < y - 1; j += 2){
				currentEvenArr.push({y: j, x: i});
			}
		}
		//添加围墙坐标到当前偶数数组
		
		let choosePos = [];
		for (let i = 4; i <= y - 5; i += 2){
			for (let j = 4; j <= x - 5; j += 2){
				choosePos.push({y: i, x: j});
			}
		}
		for (let i = 0; i < Math.floor(x/5); i++){
			currentT = Math.floor(Math.random()*choosePos.length);
			let selectWallT = choosePos[currentT];
			
			let selectDirectionT = Math.floor(Math.random()*4);
			
			if(selectDirectionT === 0){
				mat[selectWallT.y][selectWallT.x] = '墙';
				mat[selectWallT.y - 1][selectWallT.x] = '墙';
				mat[selectWallT.y - 2][selectWallT.x] = '墙';
				currentEvenArr.push({y: selectWallT.y, x: selectWallT.x});
			}
			if(selectDirectionT === 1){
				mat[selectWallT.y][selectWallT.x] = '墙';
				mat[selectWallT.y][selectWallT.x + 1] = '墙';
				mat[selectWallT.y][selectWallT.x + 2] = '墙';
				currentEvenArr.push({y: selectWallT.y, x: selectWallT.x});
			}
			if(selectDirectionT === 2){
				mat[selectWallT.y][selectWallT.x] = '墙';
				mat[selectWallT.y + 1][selectWallT.x] = '墙';
				mat[selectWallT.y + 2][selectWallT.x] = '墙';
				currentEvenArr.push({y: selectWallT.y, x: selectWallT.x});
			}
			if(selectDirectionT === 3){
				mat[selectWallT.y][selectWallT.x] = '墙';
				mat[selectWallT.y][selectWallT.x - 1] = '墙';
				mat[selectWallT.y][selectWallT.x - 2] = '墙';
				currentEvenArr.push({y: selectWallT.y, x: selectWallT.x});
			}
		}
		
		while(currentEvenArr.length){
			let current = Math.floor(Math.random()*currentEvenArr.length);
			let selectWall = currentEvenArr[current];
			//随机选择墙的位置
			
			function judge(){
				let judgeArr = [];
				if (selectWall.y > 0){
					if (mat[selectWall.y - 2][selectWall.x] === '路') judgeArr.push(0);
				};
				if (selectWall.x < x - 1){
					if (mat[selectWall.y][selectWall.x + 2] === '路') judgeArr.push(1);
				};
				if (selectWall.y < y - 1){
					if (mat[selectWall.y + 2][selectWall.x] === '路') judgeArr.push(2);
				}
				if (selectWall.x > 0){
					if (mat[selectWall.y][selectWall.x - 2] === '路') judgeArr.push(3);
				}
				return judgeArr;
			}
			//判断有几个方向可砌
			
			let directionArr = judge();
		
			if (!directionArr.length){
				currentEvenArr.splice(current, 1);
			}
			//若无可砌方向则从偶数数组中去掉这个位置
			
			if (directionArr.length){
				Math.floor(Math.random()*directionArr.length);
				let selectDirection = directionArr[Math.floor(Math.random()*directionArr.length)];
			
				if(selectDirection === 0){
					mat[selectWall.y - 1][selectWall.x] = '墙';
					mat[selectWall.y - 2][selectWall.x] = '墙';
					currentEvenArr.push({y: selectWall.y - 2, x: selectWall.x});
				}
				if(selectDirection === 1){
					mat[selectWall.y][selectWall.x + 1] = '墙';
					mat[selectWall.y][selectWall.x + 2] = '墙';
					currentEvenArr.push({y: selectWall.y, x: selectWall.x + 2});
				}
				if(selectDirection === 2){
					mat[selectWall.y + 1][selectWall.x] = '墙';
					mat[selectWall.y + 2][selectWall.x] = '墙';
					currentEvenArr.push({y: selectWall.y + 2, x: selectWall.x});
				}
				if(selectDirection === 3){
					mat[selectWall.y][selectWall.x - 1] = '墙';
					mat[selectWall.y][selectWall.x - 2] = '墙';
					currentEvenArr.push({y: selectWall.y, x: selectWall.x - 2});
				}
			}
		}
		//从可砌方向中选取一个方向砌墙
		
		return mat;
	}
	
	function searchRoad(mat){
		let res;
		let transRoad;
		let deep;
		let currentPos = {x : startX, y : mat.length - 2, deep: 1, road: [{x: startX, y: mat.length - 2}]};
		let posQueue =[currentPos];
		
		while(posQueue.length){
			let item = posQueue.shift();
			if (mat[item.y - 1][item.x] === '路'){
				mat[item.y - 1][item.x] = '标';
				transRoad = JSON.parse(JSON.stringify(item.road));
				transRoad.push({x: item.x, y: item.y - 1});
				posQueue.push({x: item.x, y: item.y - 1, deep: item.deep + 1, road: transRoad});
			}
			if (mat[1][endX] === '标') {
				res = transRoad;
				deep = item.deep + 1;
				break;
			}
			if (mat[item.y][item.x + 1] === '路'){
				mat[item.y][item.x + 1] = '标';	
				transRoad = JSON.parse(JSON.stringify(item.road));
				transRoad.push({x: item.x + 1, y: item.y})
				posQueue.push({x: item.x + 1, y: item.y, deep: item.deep + 1, road: transRoad});
			}
			if (mat[1][endX] === '标') {
				res = transRoad; 
				deep = item.deep + 1;
				break;
			}
			if (mat[item.y + 1][item.x] === '路'){
				mat[item.y + 1][item.x] = '标';
				transRoad = JSON.parse(JSON.stringify(item.road));
				transRoad.push({x: item.x, y: item.y + 1});
				posQueue.push({x: item.x, y: item.y + 1, deep: item.deep + 1, road: transRoad});
			}
			if (mat[1][endX] === '标') {
				res = transRoad;
				deep = item.deep + 1;
				break;
			}
			if (mat[item.y][item.x - 1] === '路'){
				mat[item.y][item.x - 1] = '标';
				transRoad = JSON.parse(JSON.stringify(item.road));
				transRoad.push({x: item.x - 1, y: item.y})
				posQueue.push({x: item.x - 1, y: item.y, deep: item.deep + 1, road: transRoad});
			}
			if (mat[1][endX] === '标') {
				res = transRoad; 
				deep = item.deep + 1;
				break;
			}
		}
		
		for (let i = 0; i < mat.length - 1; i++){
			for(let j = 0; j < mat[0].length - 1; j++){
				if (mat[i][j] === '标') mat[i][j] = '路';
			}
		}
		
		return [res,  deep];
	}
}
