/**
 * UpSolution Element: Sharing Buttons
 */
! function( $ ) {
	"use strict";

	function WShare( selector ) {
		var $this = $( selector ),
			$parent = $this.parent(),
			first_image_src,
			opt = {
				url: window.location,
				text: document.title,
				lang: document.documentElement.lang,
				image: $( 'meta[name="og:image"]' ).attr( 'content' ) || ''
			};
		if ( window.selectedText ) {
			opt.text = window.selectedText;
		}
		if ( $parent.attr( 'data-sharing-url' ) !== undefined && $parent.attr( 'data-sharing-url' ) !== '' ) {
			opt.url = $parent.attr( 'data-sharing-url' );
		}
		if ( $parent.attr( 'data-sharing-image' ) !== undefined && $parent.attr( 'data-sharing-image' ) !== '' ) {
			opt.image = $parent.attr( 'data-sharing-image' );
		}
		if ( opt.image === '' || opt.image === undefined ) {
			first_image_src = $( 'img' ).first().attr( 'src' );
			if ( first_image_src !== undefined && first_image_src !== '' ) {
				opt.image = first_image_src;
			}
		}
		if ( $this.hasClass( 'facebook' ) ) {
			window.open( "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent( opt.url ) + "&quote=" + encodeURIComponent( opt.text ) + "", "facebook", "toolbar=0, status=0, width=900, height=500" );
		} else if ( $this.hasClass( 'twitter' ) ) {
			window.open( "https://twitter.com/intent/tweet?text=" + encodeURIComponent( opt.text ) + "&url=" + encodeURIComponent( opt.url ), "twitter", "toolbar=0, status=0, width=650, height=360" );
		} else if ( $this.hasClass( 'linkedin' ) ) {
			window.open( 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent( opt.url ), 'linkedin', 'toolbar=no,width=550,height=550' );
		} else if ( $this.hasClass( 'whatsapp' ) ) {
			if ( jQuery.isMobile ) {
				window.open( "https://api.whatsapp.com/send?text=" + encodeURIComponent( opt.text + ' ' + opt.url ), "whatsapp", "toolbar=0, status=0, width=900, height=500" );
			} else {
				window.open( "https://web.whatsapp.com/send?text=" + encodeURIComponent( opt.text + ' ' + opt.url ), "whatsapp", "toolbar=0, status=0, width=900, height=500" );
			}
		} else if ( $this.hasClass( 'xing' ) ) {
			window.open( "https://www.xing.com/spi/shares/new?url=" + encodeURIComponent( opt.url ), "xing", "toolbar=no, status=0, width=900, height=500" );
		} else if ( $this.hasClass( 'reddit' ) ) {
			window.open( "https://www.reddit.com/submit?url=" + encodeURIComponent( opt.url ) + "&title=" + encodeURIComponent( opt.text ), "reddit", "toolbar=no, status=0, width=900, height=500" );
		} else if ( $this.hasClass( 'pinterest' ) ) {
			window.open( 'https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent( opt.url ) + '&media=' + encodeURIComponent( opt.image ) + '&description=' + encodeURIComponent( opt.text ), 'pinterest', 'toolbar=no,width=700,height=300' );
		} else if ( $this.hasClass( 'vk' ) ) {
			window.open( 'https://vk.com/share.php?url=' + encodeURIComponent( opt.url ) + '&title=' + encodeURIComponent( opt.text ) +  '&description=&image=' + encodeURIComponent( opt.image ),'vk','toolbar=no,width=700,height=300' );
		} else if ( $this.hasClass( 'telegram' ) ) {
			window.open( 'https://t.me/share/url?url=' + encodeURIComponent( opt.url ) + '&text=' + encodeURIComponent( opt.text ),'telegram','toolbar=no,width=600,height=450' );
		} else if ( $this.hasClass( 'email' ) ) {
			window.location = 'mailto:?subject=' + opt.text + '&body=' + encodeURIComponent ( opt.url );
		}
	}


	// Enable sharing via text selection
	if ( $( '.w-sharing-tooltip' ).length ) {

		var activeArea = '.l-main';

		// If Allow sharing in post content only
		if ( $( '.w-sharing-tooltip' ).attr( 'data-sharing-area' ) === 'post_content' ) {
			activeArea = '.w-post-elm.post_content';
		}

		// Close tooltip if click anywhere on page
		$( 'body' ).not( activeArea ).bind( 'mouseup', function() {
			var selection;
			if ( window.getSelection ) {
				selection = window.getSelection();
			} else if ( document.selection ) {
				selection = document.selection.createRange();
			}

			if ( selection.toString() === '' ) {
				$( ".w-sharing-tooltip.active:visible" ).hide();
			}

		} );

		// Open tooltip
		$( activeArea ).bind( 'mouseup', function( e ) {
			var selection, tooltip = '', url, $copy2clipboard = $( '.w-sharing-item.copy2clipboard' );

			if ( window.getSelection ) {
				selection = window.getSelection();
			} else if ( document.selection ) {
				selection = document.selection.createRange();
			}

			$( ".w-sharing-tooltip" ).each( function() {
				if ( $( this ).hasClass( 'active' ) ) {
					tooltip = this;
				}
			} );

			// mark first tooltip as active
			if ( tooltip === '' ) {
				$( ".w-sharing-tooltip:first" ).addClass( 'active' );
				$( ".w-sharing-tooltip.active" ).appendTo( "body" );
				tooltip = ".w-sharing-tooltip.active";
			}

			//copy selected text to window.selectedText and show tooltip
			if ( selection.toString() !== '' ) {
				window.selectedText = selection.toString();
				$( tooltip ).css( {
					"display": "inline-block", "left": e.pageX, "top": e.pageY - 50,
				} );
			} else {
				window.selectedText = '';
				$( tooltip ).hide();
			}

			//if copy
			$copy2clipboard.on( 'click', function() {
				// get url
				if ( $copy2clipboard.parent().attr( 'data-sharing-url' ) !== undefined && $copy2clipboard.parent().attr( 'data-sharing-url' ) !== '' ) {
					url = $copy2clipboard.parent().attr( 'data-sharing-url' );
				} else {
					url = window.location;
				}
				// create hidden selection
				var el = document.createElement( 'textarea' );
				el.value = window.selectedText + ' ' + url;
				el.setAttribute( 'readonly', '' );
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				document.body.appendChild( el );
				el.select();
				document.execCommand( 'copy' );
				document.body.removeChild( el );
				$( tooltip ).hide();
			} );
		} );
	}

	$( '.w-sharing-item' ).on( 'click', function() {
		WShare( this );
		$( '.w-sharing-tooltip' ).hide();
	} );
}( jQuery );