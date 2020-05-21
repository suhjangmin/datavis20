d3.csv("/data/mydata_adoptionRatio.csv").then(function(data){
	
	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 28
	var barGap = 17.5
	
	// 바 그래프 요소
	var barElements
	var barElements2

	// 세로형 Bar Graph 판 아래서부터
	var svgHeight= 450
	var svgWidth= 850

	// 그래프를 이동하기 위한 offset 변수 
	var offsetX = 40
	var offsetY = 0

	// 데이터 로딩
	var dataSet = [] // empty array to store data
	var dataSet2 = []
	var dataLabel =[]
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].domestic)
		dataSet2.push(data[i].abroad)
		dataLabel.push(data[i].year)
	}
	
	// 요소 추가
	barElements = d3.select("#myGraph2")
		.append("g")
		.attr("transform", "translate("+ offsetX +","+ -offsetY +")")
		.selectAll("rect")
		.data(dataSet)
	
	// 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bar2")
		.attr("height", function(d, i) { return d*4.2 })
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * ( barWidth + barGap ) })
		.attr("y", function(d,i) {return svgHeight - (d*4.2)})

	barElements = d3.select("#myGraph2")
		.append("g")
		.attr("transform", "translate("+ offsetX +","+ -offsetY +")")
		.selectAll("rect")
		.data(dataSet2)
	
	// 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bar3")
		.attr("height", function(d, i) { return d*4.2 })
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * ( barWidth + barGap ) })
		.attr("y", 32.5)							
									
		

	//텍스트 요소 추가
	/*barElements.enter()
	  .append("text")
		.attr("class", "barNum")
		.attr("x", function(d,i){ return i*(barWidth+barGap) + barWidth/2 })
		.attr("y", function(d,i){ return svgHeight - (d*4.2) -10}) 
		.attr("text-anchor", "middle")
		.style("arial", "none")
		.style("font-size", "6pt")
		.text(function(d,i) { return d})*/

	// y축을 표시하기 위한 스케일 설정(도메인 최대값을 데이터 최대값으로 맞출것)
	var yScale = d3.scaleLinear()
		.domain([0, 120])
		.range([500,0])

	// Axis 생성
	var y_axis=d3.axisLeft()
		.scale(yScale)

	// y-axis 표시
	d3.select("#myGraph2")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+ offsetX +","+ ((svgHeight-500)-offsetY) +")")
		.call(y_axis)

	// x축을 표시
	d3.select("#myGraph2")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 950)
		.attr("height", 1)
		.attr("transform", "translate("+offsetX+","+(svgHeight-offsetY)+")")

	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d,i){
			return i*(barWidth+barGap)+ barWidth/2
		})
		.attr("y", svgHeight+20)
		.attr("text-anchor", "middle")
		.style("arial", "none")
		.style("font-size", "9pt")
		.text(function(d,i){return dataLabel[i]})
})