$.fn.search = function (){
	let headerSearch = $(this),
		headerSearchSelected = $('.header-search-selected', headerSearch),
		headerSearchSelectList = $('.header-search-selectList', headerSearch);
	
	headerSearchSelected.on('click', function (){
		headerSearchSelectList.show();
		$(document).one('click', function (){
			headerSearchSelectList.hide();
		});
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
	
		
	tabTitleAs.on('click', function (){
		tabTitleAs.removeClass(focusClassName)
			.eq($(this).index()).addClass(focusClassName);
		tabContainers.hide()
			.eq($(this).index()).show();
	});
}


$.fn.bannerSlider = function (){
	let bannerSlider = $(this),
		bannerSliderWrap = $('.banner-slider-wrap', bannerSlider),
		imgs = $('.banner-slider-wrap > img', bannerSlider),
		leftArrow = $('.banner-slider-leftArrow', bannerSlider),
		rightArrow = $('.banner-slider-rightArrow', bannerSlider),
		processAs = $('.banner-slider-process > a', bannerSlider);
	
	let leftOffset = 0,
		wrapWidth = imgs[0].offsetWidth,
		imgIndex = 0,
		autoSlider = true,
		id;
	
	
	//自定义左滑、右滑事件
	bannerSliderWrap.on('rightslider',function (){
		if (leftOffset == wrapWidth * (imgs.size() - 1) * -1) {
			leftOffset = 0;
			imgIndex = 0;
		}
		else {
			leftOffset -= wrapWidth;
			imgIndex++;
		}
		bannerSliderWrap.css({'left': leftOffset + 'px'});
		changeProcessAColor(imgIndex);
	}).on('leftslider', function (){
		if (leftOffset == 0) {
			leftOffset -= (wrapWidth * (imgs.size() - 1));
			imgIndex = 2;
		}
		else {
			leftOffset += wrapWidth;
			imgIndex--;
		}
		bannerSliderWrap.css({'left': leftOffset + 'px'});
		changeProcessAColor(imgIndex);
	});
	
	
	//自动滚动
	bannerSliderWrap.on('autoslider', autoSliderTask)
		.triggerHandler('autoslider');
	function autoSliderTask(){
		id = setInterval(function (){
			autoSlider && bannerSliderWrap.triggerHandler('rightslider');
		}, 2000);
	}
		
	//有操作、无操作时关闭、开启自动滚动
	bannerSlider.on('mouseenter', function (){
		autoSlider = false;
		//解决bug：鼠标移出去瞬间可能刚好开始滚动
		clearInterval(id);
		bannerSliderWrap.off('autoslider', autoSliderTask);
	}).on('mouseleave', function (){
		autoSlider = true;
		bannerSliderWrap.on('autoslider', autoSliderTask)
			.triggerHandler('autoslider');
	});
	
	
	// 左箭头	
	leftArrow.on('click', function (){
		bannerSliderWrap.triggerHandler('leftslider');
	});
	// 右箭头
	rightArrow.on('click', function (){
		bannerSliderWrap.triggerHandler('rightslider');
	});
	
	
	// 进度条
	processAs.on('click', function (){
		imgIndexTemp = imgIndex;
		imgIndex = $(this).index();
		leftOffset += wrapWidth * (imgIndexTemp - imgIndex);
		bannerSliderWrap.css({'left': leftOffset + 'px'});
		changeProcessAColor(imgIndex);
	});
	function changeProcessAColor(imgIndex) {
		processAs.removeClass('focus')
			.eq(imgIndex).addClass('focus');
	}
	
	
}


$().ready(function (){
	$('.header-search').search();
	$('.content-tab').switchTab('content-tab-title', 'content-tab-container', 'focus');
	$('.content-tab-title + .content-tab-container').switchTab('content-tab-subtitle', 'content-tab-container', 'focus');
	$('.banner-slider').bannerSlider();
});