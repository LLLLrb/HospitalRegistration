$.fn.search = function (){
	let headerSearch = $(this),
		headerSearchSelected = $('.header-search-selected', headerSearch),
		headerSearchSelectList = $('.header-search-selectList', headerSearch);
	
	headerSearchSelected.on('click', function (){
		headerSearchSelectList.show();
		$(document).one('click', function (){
			headerSearchSelectList.hide();
		})
		return false;
	});
	
	$('.header-search-selectList > a', headerSearch).on('click', function (){
		$('span', headerSearchSelected).text($(this).text());
		return true;
	});
}



$.fn.switchTab = function (){
	let contentTab = $(this),
		contentTab = $('.header-search-selected', headerSearch),
		headerSearchSelectList = $('.header-search-selectList', headerSearch);
}



$().ready(function (){
	$('.header-search').search();
});