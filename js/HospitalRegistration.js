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


/*
*	@param String tabTitleName ——标签卡标题名称
*	@param String focusClassName ——点击高亮CSS类名称
*/
$.fn.switchTab = function (tabTitleName, tabContainerName, focusClassName){
	let tab = $(this),
		tabTitleAs = $('.' + tabTitleName + ' > a', tab),
		tabContainers = $('.' + tabTitleName + ' ~ .' + tabContainerName, tab);
		console.log(tabContainers)
		
		tabTitleAs.on('click', function (){
			tabTitleAs.removeClass(focusClassName)
				.eq($(this).index()).addClass(focusClassName);
			tabContainers.hide()
				.eq($(this).index()).show();
		});
}



$().ready(function (){
	$('.header-search').search();
	$('.content-tab').switchTab('content-tab-title', 'content-tab-container', 'focus');
	$('.content-tab-title + .content-tab-container').switchTab('content-tab-subtitle', 'content-tab-container', 'focus');
});