let historyTemplate = $('template#history-template').html();
let renderHistory = Handlebars.compile(historyTemplate);

let searchTemplate = $('template#search-template').html();
let renderSearch = Handlebars.compile(searchTemplate);



let searchList = [];


$('#search-button').on('click',function(){
	let username = $('#search-box').val();
	$.getJSON('https://api.github.com/users/' + username + '/repos',function(results){
		console.log(results)
	});

	let searchTerm = $('#search-box').val();
	
	$.ajax({
		type: 'post',
		url: 'http://localhost:3000/api/searches',
		data: {
			term: searchTerm,
			createdAt: new Date()
		}
	}).then(function(response){

		let search = renderSearch(response)

		searchList.push(search)
	});

	$.ajax({
		type:'get',
		url: 'http://localhost:3000/api/searches'
	}).then(function(response){ 

		let searchesHTML = renderHistory({
			posts: response
		})

		$('div#searches').html(searchesHTML)
	})

})
