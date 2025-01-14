<?php
/**
 * The Block Styles class is responsible for registering custom block style
 * variations the theme needs.
 *
 * @author    Your Name <youremail@domain.tld>
 * @copyright Copyright (c) 2023, Your Name
 * @link      https://yourwebsite.tld
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

namespace FirstDraft;

class BlockStyles
{
	/**
         * Boots the component, running its actions/filters.
         *
         * @since 1.0.0
         */
	public function boot(): void
	{
		add_action( 'init', [ $this, 'register'] );
	}

	/**
         * Register block styles.
         *
         * @since 1.0.0
	 * @link  https://developer.wordpress.org/reference/functions/register_block_style/
	 */
	public function register(): void
	{
		// Register a `hand-drawn` block style for the Image block.
		// CSS housed in the `/assets/css/blocks/core-image.css` file.
		register_block_style( 'core/image', [
			'name'  => 'hand-drawn',
			'label' => __( 'Hand-Drawn', 'first-draft' )
		] );
	}
}
