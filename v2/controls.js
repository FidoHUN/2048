class Control {
	constructor() {
		this.invalidMove = false
		this.score = 0
	}

	moveUp(boardState) {
		let final = [];
		let temp = []
		for (let i = 0; i < boardState.length; i++) {
			let col = this.getCol(boardState, i)
			let foundTiles = col.filter(function (tiles) {
				return tiles === 2 || tiles === 4 || tiles === 8 || tiles === 16 || tiles === 32 || tiles === 64 || tiles === 128 || tiles === 256 || tiles === 512 || tiles === 1024 || tiles === 2048
			})
			let remaining = []
			remaining.length = 4 - foundTiles.length
			remaining.fill(0)
			let res = foundTiles.concat(remaining)
			temp.push(res)
		}
		for (let i = 0; i < temp.length; i++) {
			let row = []
			for (let j = 0; j < temp.length; j++) {
				row.push(temp[j][i])
			}
			final.push(row)
		}
		this.mergeColUp(final)
		if (this.arraysEqual(final, boardState)) {
			this.invalidMove = true
		} else {
			this.invalidMove = false
		}
		return final
	}
	
	moveDown(boardState) {
		let final = [];
		let temp = []
		for (let i = 0; i < boardState.length; i++) {
			let col = this.getCol(boardState, i)
			let foundTiles = col.filter(function (tiles) {
				return tiles === 2 || tiles === 4 || tiles === 8 || tiles === 16 || tiles === 32 || tiles === 64 || tiles === 128 || tiles === 256 || tiles === 512 || tiles === 1024 || tiles === 2048
			})
			let remaining = []
			remaining.length = 4 - foundTiles.length
			remaining.fill(0)
			let res = remaining.concat(foundTiles)
			temp.push(res)
		}
		for (let i = 0; i < temp.length; i++) {
			let row = []
			for (let j = 0; j < temp.length; j++) {
				row.push(temp[j][i])
			}
			final.push(row)
		}
		this.mergeColDown(final)
		if (this.arraysEqual(final, boardState)) {
			this.invalidMove = true
		} else {
			this.invalidMove = false
		}
		return final
	}
	moveLeft(boardState) {
		let final = []
		for (let i = 0; i < boardState.length; i++) {
			let row = boardState[i]
			let foundTiles = row.filter(function (tiles) {
				return tiles === 2 || tiles === 4 || tiles === 8 || tiles === 16 || tiles === 32 || tiles === 64 || tiles === 128 || tiles === 256 || tiles === 512 || tiles === 1024 || tiles === 2048
			})
			let remaining = []
			remaining.length = 4 - foundTiles.length
			remaining.fill(0)
			let res = foundTiles.concat(remaining)
			final.push(res)
		}
		this.mergeRowLeft(final)
		if (this.arraysEqual(final, boardState)) {
			this.invalidMove = true
		} else {
			this.invalidMove = false
		}
		return final
	}

	moveRight(boardState) {
		let final = []
		for (let i = 0; i < boardState.length; i++) {
			let row = boardState[i]
			let foundTiles = row.filter(function (tiles) {
				return tiles === 2 || tiles === 4 || tiles === 8 || tiles === 16 || tiles === 32 || tiles === 64 || tiles === 128 || tiles === 256 || tiles === 512 || tiles === 1024 || tiles === 2048
			})
			let remaining = []
			remaining.length = 4 - foundTiles.length
			remaining.fill(0)
			let res = remaining.concat(foundTiles)
			final.push(res)
		}
		this.mergeRowRight(final)
		if (this.arraysEqual(final, boardState)) {
			this.invalidMove = true
		} else {
			this.invalidMove = false
		}
		return final
	}

	mergeRowRight(boardState) {
		for (let i = 0; i < boardState.length; i++) {
			let row = boardState[i]
			row.reverse()
			for (let j = 0 ;j < row.length; j++) {
				if (row[j] !== 0 && row[j + 1] !== 0 && row[j] === row[j + 1]) {
					let total = row[j] + row[j + 1]
					this.score += total
					row[j] = total;
					row[j+1] = 0
					if(row[j+2] !== 0 && row[j+2] !== undefined){
						row[j+1] = row[j+2]
						row[j+2] = 0
						if(row[j+3] !== 0 && row[j+3] !== undefined){
							row[j+2] = row[j+3]
							row[j+3] = 0
						}
					}
				}
			}
			row.reverse()
			for(let j=0;j<row.length;j++){
				boardState[i][j] = row[j]
			}
		}
	}

	mergeRowLeft(boardState) {
		for (let i = 0; i < boardState.length; i++) {
			let row = boardState[i]
			// row.reverse()
			for (let j = 0 ;j < row.length; j++) {
				if (row[j] !== 0 && row[j + 1] !== 0 && row[j] === row[j + 1]) {
					let total = row[j] + row[j + 1]
					this.score += total
					row[j] = total;
					row[j+1] = 0
					if(row[j+2] !== 0 && row[j+2] !== undefined){
						row[j+1] = row[j+2]
						row[j+2] = 0
						if(row[j+3] !== 0 && row[j+3] !== undefined){
							row[j+2] = row[j+3]
							row[j+3] = 0
						}
					}
				}
			}
			// row.reverse()
			for(let j=0;j<row.length;j++){
				boardState[i][j] = row[j]
			}
		}
	}

	mergeColDown(boardState) {
		for (let i = 0; i < boardState.length; i++) {
			let col = this.getCol(boardState, i)
			col.reverse()
			for (let j = 0 ;j < col.length; j++) {
				if (col[j] !== 0 && col[j + 1] !== 0 && col[j] === col[j + 1]) {
					let total = col[j] + col[j + 1]
					this.score += total
					col[j] = total;
					col[j+1] = 0
					if(col[j+2] !== 0 && col[j+2] !== undefined){
						col[j+1] = col[j+2]
						col[j+2] = 0
						if(col[j+3] !== 0&& col[j+3] !== undefined){
							col[j+2] = col[j+3]
							col[j+3] = 0
						}
					}
				}
			}
			col.reverse()
			for(let j=0;j<col.length;j++){
				boardState[j][i] = col[j]
			}
		}
	}

	mergeColUp(boardState) {
		for (let i = 0; i < boardState.length; i++) {
			let col = this.getCol(boardState, i)
			// col.reverse()
			for (let j = 0 ;j < col.length; j++) {
				if (col[j] !== 0 && col[j + 1] !== 0 && col[j] === col[j + 1]) {
					let total = col[j] + col[j + 1]
					this.score += total
					col[j] = total;
					col[j+1] = 0
					if(col[j+2] !== 0 && col[j+2] !== undefined){
						col[j+1] = col[j+2]
						col[j+2] = 0
						if(col[j+3] !== 0 && col[j+3] !== undefined){
							col[j+2] = col[j+3]
							col[j+3] = 0
						}
					}
				}
			}
			// col.reverse()
			for(let j=0;j<col.length;j++){
				boardState[j][i] = col[j]
			}
		}
	}

	getCol(matrix, col) {
		var column = [];
		for (var i = 0; i < matrix.length; i++) {
			column.push(matrix[i][col]);
		}
		return column;
	}

	getRow(matrix, row) {
		var Rrow = [];
		for (var i = 0; i < matrix.length; i++) {
			Rrow.push(matrix[row][i]);
		}
		return Rrow;
	}

	arraysEqual(a1, a2) {
		return JSON.stringify(a1) == JSON.stringify(a2);
	}
}

