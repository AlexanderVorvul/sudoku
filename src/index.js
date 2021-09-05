module.exports =  function solveSudoku(matrix) {

	for (let i = 0; i < matrix.length; i++) {

	  for (let j = 0; j < matrix[i].length; j++) {

		if (matrix[i][j] === 0) {

		  for (let elementToCheck = 1; elementToCheck <= 9; elementToCheck++) {

			matrix[i][j] = elementToCheck;

			let numberOfSuchElementsInTheRow = 0;
			//Check Row
			for(let k = 0; k < matrix[i].length; k++)
				if (elementToCheck === matrix[i][k]) numberOfSuchElementsInTheRow++;

			if (numberOfSuchElementsInTheRow <= 1) {              
				//Then Check Column
				let numberOfSuchElementsInTheColumn = 0;

				for(let k = 0; k < matrix[i].length; k++)
					if (elementToCheck === matrix[k][j]) numberOfSuchElementsInTheColumn++;

				if (numberOfSuchElementsInTheColumn <= 1) {
					//Then Check Matrix 3 x 3
					let numberOfSuchElementsInTheMatrix3x3 = 0;
					const offsetI = 3 * Math.floor(i/3),
						  offsetJ = 3 * Math.floor(j/3);
					for (let k = offsetI; k < 3 + offsetI; k++)						
				  		for (let m = offsetJ; m < 3 + offsetJ; m++)
							if (elementToCheck === matrix[k][m]) numberOfSuchElementsInTheMatrix3x3++;

					if (numberOfSuchElementsInTheMatrix3x3 <= 1)
						if (solveSudoku(matrix))
							return matrix;
			  }
			}            
		  }
		  matrix[i][j] = 0;
		  return false;
		}        
	  }
	}
	return matrix;
  }
