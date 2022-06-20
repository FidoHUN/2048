class Board{
	  #state;
	  #control;

	constructor(){
		this.state = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]];

			this.control = new Control();

			this.gameOver = false
			this.won = false

			this.brain = new NeuralNetwork([16,8,4])
			console.log(this.brain);
		
			this.sensors = new Array(16)
			this.aiDecision = [0,0,0,0];
	}

	  generateRandomIndex(){
			let rnd = Math.floor(Math.random()*4)+1;
			let index = rnd-1;
			return index;
	  }

	  generateRandomTile(ai=false){
			let rnd = Math.floor(Math.random()*2)+1;
			let tile = undefined;
			if(rnd === 1){
				  tile = 2;
				  let I = this.generateRandomIndex()
				  let J = this.generateRandomIndex()
				  if(this.state[I][J]===0){
						this.state[I][J] = tile
				  }else{
						this.generateRandomTile()
				  }
			}else{
				  tile = 4;
				  let I = this.generateRandomIndex()
				  let J = this.generateRandomIndex()
				  if(this.state[I][J]===0){
						this.state[I][J] = tile
				  }else{
						this.generateRandomTile()
				  }
			}
			if(ai){
				this.refreshInputs();
				const outputs = NeuralNetwork.feedForward(this.sensors,this.brain)
				this.aiDecision = outputs;
			}
	  }

	  generateStartingPosition(){
		  if(!localStorage.getItem("bestScore")){
			localStorage.setItem("bestScore", 0);
		  }
			this.generateRandomTile();
			this.generateRandomTile(true);
	  }

	  addEventListeners(canvas){
			document.addEventListener("keydown", (e)=>{
				  if(!e.repeat){
						if(e.key === "ArrowUp"){
							  this.state = this.control.moveUp(this.state);
							  if(!this.control.invalidMove){
									Renderer.render(this.state,canvas,this.control.score)
									setTimeout(()=>{
										  this.generateRandomTile()
										  Renderer.render(this.state,canvas,this.control.score)
									}, 200)
							  }
						}
						if(e.key === "ArrowDown"){
							  this.state = this.control.moveDown(this.state);
							  if(!this.control.invalidMove){
									Renderer.render(this.state,canvas,this.control.score)
									setTimeout(()=>{
										  this.generateRandomTile()
										  Renderer.render(this.state,canvas,this.control.score)
									}, 200)
							  }
						}
						if(e.key === "ArrowLeft"){
							  this.state = this.control.moveLeft(this.state);
							  if(!this.control.invalidMove){
									Renderer.render(this.state,canvas,this.control.score)
									setTimeout(()=>{
										  this.generateRandomTile()
										  Renderer.render(this.state,canvas,this.control.score)
									}, 200)
							  }
						}
						if(e.key === "ArrowRight"){
							  this.state = this.control.moveRight(this.state);
							  if(!this.control.invalidMove){
									Renderer.render(this.state,canvas,this.control.score)
									setTimeout(()=>{
										  this.generateRandomTile()
										  Renderer.render(this.state,canvas,this.control.score)
									}, 200)
							  }
						}

						setTimeout(()=>{
							  this.checkWin()
							  if(this.won){
									alert("NYERTÉL!")
									window.location.reload();
							  }
							  this.checkGameOver()
							  if(this.gameOver){
									alert("VESZTETTÉL!")
									window.location.reload();
							  }
						}, 500)
				  }
			});
	  }
	  
	  sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

	  async addNeuralNetwork(canvas){
		while(!this.won || !this.gameOver){
			this.aiMove(canvas)
			await this.sleep(600);
			this.checkWin()
			  if(this.won){
					alert("NYERTÉL!")
					window.location.reload();
			  }
			  this.checkGameOver()
			  if(this.gameOver){
				  const bestScore = parseInt(localStorage.getItem("bestScore"))
				  if(this.control.score > bestScore){
					  this.saveNeuralNetworkAndScore(this.brain)
				  }
					window.location.reload();
			  }
		}
	  }
	  
	  saveNeuralNetworkAndScore(brain){
		  localStorage.setItem("bestScore", this.control.score)
		  localStorage.setItem("bestBrain", JSON.stringify(brain));
	  }
	  
	  refreshInputs(){
		  let indexCounter = 0;
		  for(let i=0;i<this.state.length;i++){
			  for(let j=0;j<this.state[i].length;j++){
				  if(this.state[i][j] === 0){
					  this.sensors[indexCounter] = 0.08*1
				  }else if(this.state[i][j] === 2){
					  this.sensors[indexCounter] = 0.08*2
				  }else if(this.state[i][j] === 4){
					  this.sensors[indexCounter] = 0.08*3
				  }else if(this.state[i][j] === 8){
					  this.sensors[indexCounter] = 0.08*4
				  }else if(this.state[i][j] === 16){
					  this.sensors[indexCounter] = 0.08*5
				  }else if(this.state[i][j] === 32){
					  this.sensors[indexCounter] = 0.08*6
				  }else if(this.state[i][j] === 64){
					  this.sensors[indexCounter] = 0.08*7
				  }else if(this.state[i][j] === 128){
					  this.sensors[indexCounter] = 0.08*8
				  }else if(this.state[i][j] === 256){
					  this.sensors[indexCounter] = 0.08*9
				  }else if(this.state[i][j] === 512){
					  this.sensors[indexCounter] = 0.08*10
				  }else if(this.state[i][j] === 1024){
					  this.sensors[indexCounter] = 0.08*11
				  }else if(this.state[i][j] === 2048){
					  this.sensors[indexCounter] = 0.08*12
				  }
				  indexCounter++;
			  }
		  }
	  }
	  
	  aiMove(canvas){
				if(this.aiDecision[0]===1){
					this.state = this.control.moveUp(this.state);
					  if(!this.control.invalidMove){
							Renderer.render(this.state,canvas,this.control.score)
							setTimeout(()=>{
								  this.generateRandomTile(true)
								  Renderer.render(this.state,canvas,this.control.score)
							}, 500)
					  }else{
						this.aiDecision.fill(0);
						let randomIndex = Math.floor(Math.random() * 3);
						this.aiDecision[randomIndex] = 1;
						this.aiMove(canvas);
					  }
				}else if(this.aiDecision[1]===1){
					this.state = this.control.moveDown(this.state);
					  if(!this.control.invalidMove){
							Renderer.render(this.state,canvas,this.control.score)
							setTimeout(()=>{
								  this.generateRandomTile(true)
								  Renderer.render(this.state,canvas,this.control.score)
							}, 500)
					  }else{
						this.aiDecision.fill(0);
						let randomIndex = Math.floor(Math.random() * 3);
						this.aiDecision[randomIndex] = 1;
						this.aiMove(canvas);
					  }
					  
				}else if(this.aiDecision[2]===1){
					this.state = this.control.moveRight(this.state);
					  if(!this.control.invalidMove){
							Renderer.render(this.state,canvas,this.control.score)
							setTimeout(()=>{
								  this.generateRandomTile(true)
								  Renderer.render(this.state,canvas,this.control.score)
							}, 500)
					  }else{
						this.aiDecision.fill(0);
						let randomIndex = Math.floor(Math.random() * 3);
						this.aiDecision[randomIndex] = 1;
						this.aiMove(canvas);
					  }
					  
				}else if(this.aiDecision[3]===1){
					this.state = this.control.moveLeft(this.state);
					  if(!this.control.invalidMove){
							Renderer.render(this.state,canvas,this.control.score)
							setTimeout(()=>{
								  this.generateRandomTile(true)
								  Renderer.render(this.state,canvas,this.control.score)
							}, 500)
					  }else{
						this.aiDecision.fill(0);
						let randomIndex = Math.floor(Math.random() * 3);
						this.aiDecision[randomIndex] = 1;
						this.aiMove(canvas);
					  }
					  
				}
	  }
	  
	  checkWin(){
			for(let i=0;i<this.state.length;i++){
				  for(let j=0;j<this.state[i].length;j++){
						if(this.state[i][j]==2048){
							  this.won = true
						}
				  }
			}
	  }

	  checkGameOver(){
			
			let boardFilled = true
			let validMovesCounter = 0;

			for(let i=0;i<this.state.length;i++){
				  for(let j=0;j<this.state[i].length;j++){
						if(this.state[i][j]==0){
							  boardFilled = false
							  return
						}
				  }
			}

			if(boardFilled){
				  //check for row game over
				  for(let i=0;i<this.state.length;i++){
						for(let j=0;j<this.state[i].length-1;j++){
							  if(this.state[i][j]===this.state[i][j+1]){
									validMovesCounter++;
							  }
						}
				  }
				  //check for row game over
				  for(let i=0;i<this.state.length;i++){
						for(let j=0;j<this.state[i].length-1;j++){
							  if(this.state[j][i]===this.state[j+1][i]){
									validMovesCounter++;
							  }
						}
				  }
				  if(validMovesCounter === 0){
						this.gameOver = true;
				  }
			}
	  }
}
			
