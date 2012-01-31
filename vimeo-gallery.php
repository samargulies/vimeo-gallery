<?php
/*
Plugin Name: Vimeo gallery shortcode
Plugin URI: http://belabor.org/
Description: Adds a [vimeo-gallery] shortcode
Version: 1.0
Author: Sam Margulies (http://belabor.org/)
*/

add_shortcode('vimeo-gallery', 'do_vimeo_gallery_shortcode');

function do_vimeo_gallery_shortcode($atts, $content="") {
	
	$defaults = array(
		'width'  => 640,
		'height' => 380	
	);
	
	$atts = shortcode_atts($defaults, $atts);
	
	if( preg_match_all( '/http:\/\/vimeo\.com\/\d+/im', trim($content), $videos, PREG_PATTERN_ORDER) == 0 ) {
		echo "<!-- Vimeo gallery failed to find any videos -->";
		return;
	}
	
	$videos = $videos[0];
	
	static $gallery_id;
	$gallery_id++;

	wp_enqueue_style( 'vimeo_gallery_css', plugins_url( 'vimeo-gallery.css' , __FILE__ ) );
	wp_enqueue_script( 'vimeo_gallery_scripts', plugins_url( 'vimeo-gallery.js' , __FILE__ ), array('jquery') );

	?>

	<div id="vimeo-gallery-<?php echo $gallery_id; ?>" class="vimeo-gallery" style="width:<?php echo $atts['width']; ?>px; height: <?php echo $atts['height']; ?>px;">
		<div class="video"></div>
		<div class="playlist">
			<ul>
			<?php
			foreach($videos as $video) {
				$video = esc_attr( strtolower($video) );
				echo "<li data-video-url='$video'/></li>";
			}
			?>	
			</ul>
		</div>
	</div>

	<?php
}

?>