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
	}

      generateRandomIndex(){
            let rnd = Math.floor(Math.random()*4)+1;
            let index = rnd-1;
            return index;
      }

      generateRandomTile(){
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
      }

      generateStartingPosition(){
            this.generateRandomTile();
            this.generateRandomTile();
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
            
