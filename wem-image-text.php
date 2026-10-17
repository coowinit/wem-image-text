<?php
/**
 * Plugin Name: WEM Image Text
 * Description: Lightweight responsive image-and-text layout block for Gutenberg.
 * Version: 1.0.0
 * Requires at least: 6.3
 * Requires PHP: 7.4
 * Author: WEM
 * Text Domain: wem-image-text
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
define( 'WEM_IMAGE_TEXT_VERSION', '1.0.0' );
define( 'WEM_IMAGE_TEXT_PATH', plugin_dir_path( __FILE__ ) );
define( 'WEM_IMAGE_TEXT_URL', plugin_dir_url( __FILE__ ) );
add_action( 'init', 'wem_image_text_register_blocks' );
function wem_image_text_register_blocks() {
    wp_register_script( 'wem-image-text-editor', WEM_IMAGE_TEXT_URL . 'assets/js/editor.js', array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ), WEM_IMAGE_TEXT_VERSION, true );
    register_block_type( WEM_IMAGE_TEXT_PATH );
    register_block_type( WEM_IMAGE_TEXT_PATH . 'blocks/media' );
    register_block_type( WEM_IMAGE_TEXT_PATH . 'blocks/content' );
}


add_action( 'enqueue_block_editor_assets', 'wem_image_text_enqueue_inspector_styles' );
function wem_image_text_enqueue_inspector_styles() {
    wp_enqueue_style(
        'wem-image-text-inspector',
        WEM_IMAGE_TEXT_URL . 'assets/css/inspector.css',
        array( 'wp-components', 'wp-block-editor' ),
        WEM_IMAGE_TEXT_VERSION
    );
}
