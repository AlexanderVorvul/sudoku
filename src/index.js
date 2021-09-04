module.exports = function solveSudoku(matrix) {
  function checkPos(matrix, col, row){
  	let tryArr = new Array (1, 2, 3, 4, 5, 6, 7 , 8, 9);
  	let offsetI = 3 * Math.floor(row/3);
  	let offsetJ = 3 * Math.floor(col/3);
    for (let i = 0 ; i < 3; i++)	  
      for (let j = 0 ; j < 3; j++){	
        let index = tryArr.indexOf(matrix[offsetI + i][offsetJ + j]);
        if (index != -1) tryArr.splice(index, 1);
      }
    for (let i = 0 ; i < 9; i++){
        let index = tryArr.indexOf(matrix[i][col]);
        if (index != -1) tryArr.splice(index, 1);
	    	index = tryArr.indexOf(matrix[row][i]);
        if (index != -1) tryArr.splice(index, 1);		
    }
	return tryArr;
  }

	function simpleCheck(matrix){
  	let matrixChanged = true;	
  	while (matrixChanged) {
	  	matrixChanged =false;
 		  for (let  i = 0 ; i < 9; i++){
        for (let j = 0 ; j < 9; j++){
			     if(matrix[i][j] === 0)
			      matrix[i][j] = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
			     if (Array.isArray(matrix[i][j])){
			      let tryArr = checkPos(matrix, j, i);
			      if(tryArr.length >0){
			        if(tryArr.length === 1) {
				        tryArr = tryArr[0];
				        matrixChanged = true;
			          //	console.log("matrixChanged at ["+ i+ ', '+j +"] = " + tryArr)
			        }			
	       	    matrix[i][j] = tryArr;
			      }
    		  }
	  	  }
		  }
	  }
	}

	function clone(item){
		let result;
		if (Object.prototype.toString.call( item ) === "[object Array]") {
      result = [];
      for(let i=0;i<item.length;i++)
        result[i] = clone( item[i]);
		} else result = item;
		return result;   
	}

	function isSolved__(m){
		for (let  i = 0 ; i < m.length; i++)
   		for (let j = 0 ; j < m[i].length; j++)
				if (Array.isArray(m[i][j])) return false;
		return true;
	}
	
	simpleCheck(matrix);
	/*let s=0, s2=0
	for (let  i = 0 ; i < matrix.length; i++)
  	  	for (let j = 0 ; j < matrix[i].length; j++)
			if (Array.isArray(matrix[i][j])) s++;
				else  s2++;
//	console.log("solved = "+s2+" arrays = "+s)
	
	//console.log(matrix)
	*/
	if (isSolved__(matrix)) return true;	
	for (let  i = 0 ; i < matrix.length; i++){
 	  for (let j = 0 ; j < matrix[i].length; j++){
    	if (Array.isArray(matrix[i][j]))
			for (let k = 0 ; k < matrix[i][j].length; k++){
				let cloneM = clone(matrix);
				cloneM[i][j] = matrix[i][j][k];	
				if(solveSudoku(cloneM) ) return true;
	  	}		  
	  }
	}	
  return false;
} 
