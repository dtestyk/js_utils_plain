function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var tt=
	'#L#L'+
	'LXLO'+
	'#L#L'+
	'LOLX'
var n=m=8
var arr=[]

function init(){
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			var v=0
			
			if(type=='X') v=1
			if(type=='O') v=1
			if(type=='#') v=0
			if(type=='L') v=0

			arr[i*m+j]=v
		}
	}
}
	
function updateXO(){
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			
			var up=arr[(i+n-1)%n*m+j]
			var down=arr[(i+1)%n*m+j]
			var left=arr[i*m+(j+m-1)%m]
			var right=arr[i*m+(j+1)%m]

			var neib=up+down+left+right
			var mul=({X:1,O:-1})[type]||0
			var val=arr[i*m+j]+neib*mul
			//if(val==5) val=Infinity
			arr[i*m+j]=val
		}
	}
}

function updateL(){
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			if(type!=='L') continue;
			
			var up=arr[(i+n-1)%n*m+j]
			var down=arr[(i+1)%n*m+j]
			var left=arr[i*m+(j+m-1)%m]
			var right=arr[i*m+(j+1)%m]
			
			var isNeib5=
				up==5||
				down==5||
				left==5||
				right==5
			
			
			var val=isNeib5? 0: getRandomInt(-1,1)
			arr[i*m+j]=val
		}
	}
}

function sumX(){
	var sum=0
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			if(type=='X') sum+=arr[i*m+j]
		}
	}
	return sum
}

function sumO(){
	var sum=0
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			if(type=='O') sum+=arr[i*m+j]
		}
	}
	return sum
}

function try_flip(){
	if(sumO()<=0 || sumX()<=0){
		console.log("flip")
		for(var i=0;i<n;i++){
			for(var j=0;j<m;j++){
				var type=tt.charAt(i%4*4+j%4)
				if(type=='L') arr[i*m+j]=-arr[i*m+j]
			}
		}
	}
}

function sumXO(){
	var sum=0
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			if(type=='X'||type=='O') sum+=arr[i*m+j]
		}
	}
	return sum
}


function show(){
	var str=''
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			if(type=='#')val='#'
			else val=arr[i*m+j]
			str+=val+'\t'
		}
		str+='\n'
	}
	console.log(str)
}

function showXO(){
	var str=''
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			var type=tt.charAt(i%4*4+j%4)
			var val=arr[i*m+j]
			if(type=='X'||type=='O') str+=val+'\t'
		}
		str+='\n'
	}
	console.log(str)
}


init()

for(i=16;i;i--){
  try_flip()
  updateL()
  updateXO()
  show()
  sumXO()
}

//проблема: остаются знчения, окруженные зафиксированными


#|#|#|#|
-x-o-x-o
#|#|#|#|
-o-x-o-x
#|#|#|#|
-x-o-x-o
#|#|#|#|
-o-x-o-x

x#x#x#x#x#x
#o#o#o#o#o#
x#x#x#x#x#x
#o#o#o#o#o#
x#x#x#x#x#x

x###x###x##
#\#/#\#/#\#
##o###o###o
#/#\#/#\#/#
x###x###x##

x-+-x-+-x-+
|\|/|\|/|\|
+-o-+-o-+-o
|/|\|/|\|/|
x-+-x-+-x-+
