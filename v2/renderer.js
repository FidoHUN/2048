class Renderer{
	static render(boardState, canvas, score){
		// drawing the board
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "lightgray";
       		 ctx.fillRect(0,0,canvas.width,canvas.height);
		let pixelDiff = 25;

		for(let i=0 ; i<boardState.length ; i++){
			for (let j=0 ; j<boardState[i].length ; j++){
				if(boardState[i][j] === 2 || boardState[i][j] === 4){
					ctx.fillStyle = "#ffffba";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "black";
			        ctx.font = "bold 80px Arial";
			        ctx.fillText("2", j*100+pixelDiff, i*100+100-pixelDiff);
				}
				if(boardState[i][j] === 4){
					ctx.fillStyle = "#ffffba";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "black";
			        ctx.font = "1bold 80px Arial";
			        ctx.fillText("4", j*100+pixelDiff, i*100+100-pixelDiff);
				}
				if(boardState[i][j] === 8 || boardState[i][j] === 16){
					ctx.fillStyle = "#ff8000";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 80px Arial";
			        ctx.fillText("8", j*100+pixelDiff, i*100+100-pixelDiff);
				}
				if(boardState[i][j] === 16){
					ctx.fillStyle = "#ff6700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 48px Arial";
			        ctx.fillText("16", j*100+pixelDiff, i*100+95-pixelDiff);
				}
				if(boardState[i][j] === 32){
					ctx.fillStyle = "#ff4a00";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 48px Arial";
			        ctx.fillText("32", j*100+pixelDiff, i*100+95-pixelDiff);
				}
				if(boardState[i][j] === 64){
					pixelDiff = 25;
					ctx.fillStyle = "#ff0000";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 48px Arial";
			        ctx.fillText("64", j*100+pixelDiff, i*100+95-pixelDiff);
				}
				if(boardState[i][j] === 128){
					pixelDiff = 10;
					ctx.fillStyle = "#ffd700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 40px Arial";
			        ctx.fillText("128", j*108+pixelDiff, i*100+75-pixelDiff);
				}
				if(boardState[i][j] === 256){
					pixelDiff = 10;
					ctx.fillStyle = "#ffd700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 40px Arial";
			        ctx.fillText("256", j*108+pixelDiff, i*100+75-pixelDiff);
				}
				if(boardState[i][j] === 512){
					pixelDiff = 10;
					ctx.fillStyle = "#ffd700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 40px Arial";
			        ctx.fillText("512", j*108+pixelDiff, i*100+75-pixelDiff);
				}
				if(boardState[i][j] === 1024){
					pixelDiff = 10;
					ctx.fillStyle = "#ffd700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 35px Arial";
			        ctx.fillText("1024", j*100+pixelDiff, i*100+75-pixelDiff);
				}
				if(boardState[i][j] === 2048){
					pixelDiff = 10;
					ctx.fillStyle = "#ffd700";
					ctx.fillRect(j*100,i*100,100,100); 
					ctx.fillStyle = "white";
			        ctx.font = "bold 35px Arial";
			        ctx.fillText("2048", j*100+pixelDiff, i*100+75-pixelDiff);
				}
			}
		}

		//drawing the lines
		ctx.fillStyle = "darkgray";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for(let i=1 ; i<5 ; i++){
            ctx.moveTo(i*100,0);
            ctx.lineTo(i*100,400);
        }
        for(let i=1 ; i<5 ; i++){
            ctx.moveTo(0,i*100);
            ctx.lineTo(400,i*100);
        }
        ctx.stroke();

		let points;
		if(canvas.id!==undefined){
			let idNumber = parseInt(canvas.id.split('_')[1])
			points = document.querySelector(`#points_${idNumber}`)
			points.innerHTML = score;
		}
	}	
}
