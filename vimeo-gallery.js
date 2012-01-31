jQuery(document).ready(function($){
	var video_info = {};
	
	// Get the user's videos
	function setupGalleries() {
		
		$('.vimeo-gallery .playlist li').each(function(){
		
			var video$ = $(this),
				video_url = video$.attr('data-video-url');
			
			if( undefined == video_url ) {
				return;
			}
			
			$.ajax({
			
				'url' : 'http://vimeo.com/api/oembed.json?url=' + video_url + '&width=640&height=360&callback=addVideo',
				'dataType' : 'jsonp',
				'success' :  function(video){
					// we have the embed info now, lets program the playlist
					
					// save all the the data for later
					video_info[video.video_id] = video;
					
					var listItem = '<a href="##" data-video-id="' + video.video_id + '"><img src="' + video.thumbnail_url + '" class="thumbnail" width="33.3333333%" />';
					listItem += '<h2>' + video.title + '</h2></a><p>' +  video.description + '</p>';
					
					video$.html(listItem);
					
					if( video$.is('li:first-child') ) {
						video$.find('a').click();
					}
				},
				'error' : function() {
					// can't let the bad videos spoil all the fun
					video$.remove();
				}
			});
			
		});
	}
	
	$('.vimeo-gallery .playlist a').live( 'click', function(e) {
		e.preventDefault();
		
		var	currentListItem$ = $(this).parents('li'),
			video_id = $(this).attr('data-video-id');

		if( currentListItem$.hasClass('active') ) {
			return;
		}
		
		currentListItem$.siblings().removeClass('active');
		currentListItem$.addClass('active');
					
		$(this).parents('.vimeo-gallery').find('.video').html( unescape(  video_info[ video_id ].html ) ).attr('data-video-id', video_id);
		
		return false;
	});
	
	setupGalleries();

});


