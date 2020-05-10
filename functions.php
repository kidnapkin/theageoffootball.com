<?php

  add_action( 'wp_enqueue_scripts', 'load_script' );
  add_action( 'after_setup_theme', 'childtheme_formats', 11 );

  add_filter( 'content_pagination', 'gallery_format_content', 10, 2 );

  function load_script() {
    wp_register_script( 
      'custom-script', 
      get_stylesheet_directory_uri() . '/custom.js', 
      array( 'jquery' )
    );
    wp_enqueue_script( 'custom-script' );
  }

  function childtheme_formats() {
    add_theme_support( 'post-formats', array( 'gallery' ) );
  }

  function gallery_format_content( $pages, $post ) {
    if ( in_the_loop() && has_post_format('gallery') ) {
      $output = '<ul class="gallery-format-list">';
      foreach( $pages as $key=>$value ) {
        $index = (int)$key + 1;
        $output .= <<<EOT
          <li class="gallery-format-item gallery-format-item-$index" data-image-index=$index>
            <div class="gallery-format-num">
              $index
            </div>
            $value
          </li>
        EOT;
      }
      $output .= '</ul>';

      return [$output];
    }

    return $pages;
  }

?>
