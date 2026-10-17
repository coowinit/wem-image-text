( function ( wp ) {
    'use strict';

    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var __ = wp.i18n.__;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InnerBlocks = wp.blockEditor.InnerBlocks;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    var LAYOUTS = [
        { value: 'image-left', label: __( 'Image left, content right', 'wem-image-text' ), image: 'left' },
        { value: 'image-right', label: __( 'Content left, image right', 'wem-image-text' ), image: 'right' },
        { value: 'image-top', label: __( 'Image above content', 'wem-image-text' ), image: 'top' },
        { value: 'image-bottom', label: __( 'Content above image', 'wem-image-text' ), image: 'bottom' }
    ];

    var MOBILE_ORDERS = [
        { value: 'image-first', label: __( 'Image first', 'wem-image-text' ), image: 'top' },
        { value: 'content-first', label: __( 'Content first', 'wem-image-text' ), image: 'bottom' }
    ];

    var PARENT_TEMPLATE = [
        [ 'wem/image-text-media', {}, [
            [ 'core/image', { sizeSlug: 'large', linkDestination: 'none' } ]
        ] ],
        [ 'wem/image-text-content', {}, [
            [ 'core/heading', { level: 3, placeholder: __( 'Add a heading…', 'wem-image-text' ) } ],
            [ 'core/paragraph', { placeholder: __( 'Add your text…', 'wem-image-text' ) } ]
        ] ]
    ];

    function classNames( a ) {
        return 'wem-image-text wem-image-text--desktop-' + a.desktopLayout +
            ' wem-image-text--mobile-' + a.mobileOrder;
    }

    function PreviewIcon( props ) {
        var image = props.image;
        var imageStyle = {
            background: '#8EACC2',
            borderRadius: '2px',
            display: 'block',
            position: 'absolute',
            boxSizing: 'border-box'
        };
        var textStyle = {
            background: '#DDE3E8',
            borderRadius: '2px',
            display: 'block',
            position: 'absolute',
            boxSizing: 'border-box'
        };

        if ( image === 'left' ) {
            Object.assign( imageStyle, { left: '0', top: '0', width: '43%', height: '100%' } );
            Object.assign( textStyle, { right: '0', top: '0', width: '51%', height: '100%' } );
        } else if ( image === 'right' ) {
            Object.assign( textStyle, { left: '0', top: '0', width: '51%', height: '100%' } );
            Object.assign( imageStyle, { right: '0', top: '0', width: '43%', height: '100%' } );
        } else if ( image === 'top' ) {
            Object.assign( imageStyle, { left: '0', top: '0', width: '100%', height: '53%' } );
            Object.assign( textStyle, { left: '0', bottom: '0', width: '100%', height: '39%' } );
        } else {
            Object.assign( textStyle, { left: '0', top: '0', width: '100%', height: '39%' } );
            Object.assign( imageStyle, { left: '0', bottom: '0', width: '100%', height: '53%' } );
        }

        return el( 'span', {
            className: 'wem-it-layout-icon',
            'aria-hidden': true
        },
            el( 'span', { style: imageStyle } ),
            el( 'span', { style: textStyle } )
        );
    }

    function LayoutPicker( props ) {
        return el( 'div', { className: 'wem-it-layout-picker', role: 'group', 'aria-label': props.label },
            props.options.map( function ( option ) {
                var selected = props.value === option.value;
                return el( Button, {
                    key: option.value,
                    className: 'wem-it-layout-option' + ( selected ? ' is-selected' : '' ),
                    variant: selected ? 'primary' : 'secondary',
                    isPressed: selected,
                    onClick: function () { props.onChange( option.value ); },
                    'aria-label': option.label,
                    'aria-pressed': selected
                },
                    el( PreviewIcon, { image: option.image } ),
                    el( 'span', { className: 'wem-it-layout-label' }, option.label )
                );
            } )
        );
    }

    registerBlockType( 'wem/image-text', {
        apiVersion: 3,
        title: __( 'WEM Image Text', 'wem-image-text' ),
        description: __( 'Responsive image and content layout.', 'wem-image-text' ),
        category: 'design',
        icon: 'columns',
        attributes: {
            desktopLayout: { type: 'string', default: 'image-left' },
            mobileOrder: { type: 'string', default: 'image-first' },
            imageWidth: { type: 'number', default: 50 },
            gap: { type: 'number', default: 24 },
            imageRadius: { type: 'number', default: 0 },
            textOffsetDesktop: { type: 'number', default: 24 },
            textOffsetMobile: { type: 'number', default: 16 },
            mobileTextMargin: { type: 'number', default: 16 }
        },
        supports: { html: false, anchor: true, align: [ 'wide', 'full' ] },

        edit: function ( props ) {
            var a = props.attributes;
            var set = props.setAttributes;
            var vertical = a.desktopLayout === 'image-top' || a.desktopLayout === 'image-bottom';
            var blockProps = useBlockProps( {
                className: classNames( a ),
                style: {
                    '--wem-it-image-width': a.imageWidth + '%',
                    '--wem-it-gap': a.gap + 'px',
                    '--wem-it-radius': a.imageRadius + 'px',
                    '--wem-it-mobile-text-margin': a.mobileTextMargin + 'px'
                }
            } );

            return el( Fragment, null,
                el( InspectorControls, null,
                    el( PanelBody, { title: __( 'Desktop layout', 'wem-image-text' ), initialOpen: true },
                        el( LayoutPicker, {
                            label: __( 'Desktop layout', 'wem-image-text' ),
                            value: a.desktopLayout,
                            options: LAYOUTS,
                            onChange: function ( value ) { set( { desktopLayout: value } ); }
                        } ),
                        vertical ? null : el( 'div', { className: 'wem-it-control-section' },
                            el( 'div', { className: 'wem-it-control-title' }, __( 'Image width', 'wem-image-text' ) ),
                            el( 'div', { className: 'wem-it-width-options', role: 'group', 'aria-label': __( 'Image width', 'wem-image-text' ) },
                                [ 40, 50, 60 ].map( function ( width ) {
                                    var selected = a.imageWidth === width;
                                    return el( Button, {
                                        key: width,
                                        variant: selected ? 'primary' : 'secondary',
                                        isPressed: selected,
                                        onClick: function () { set( { imageWidth: width } ); }
                                    }, width + '%' );
                                } )
                            )
                        )
                    ),
                    el( PanelBody, { title: __( 'Mobile layout', 'wem-image-text' ), initialOpen: true },
                        el( LayoutPicker, {
                            label: __( 'Mobile order', 'wem-image-text' ),
                            value: a.mobileOrder,
                            options: MOBILE_ORDERS,
                            onChange: function ( value ) { set( { mobileOrder: value } ); }
                        } )
                    ),
                    el( PanelBody, { title: __( 'Text spacing and image style', 'wem-image-text' ), initialOpen: false },
                        el( RangeControl, {
                            label: __( 'Desktop image/content gap (px)', 'wem-image-text' ),
                            help: __( 'Controls the distance between image and content on desktop. On mobile, the grid gap is always zero.', 'wem-image-text' ),
                            value: a.gap, min: 0, max: 80, step: 4,
                            onChange: function ( value ) {
                                if ( value !== undefined ) { set( { gap: Number( value ) } ); }
                            }
                        } ),
                        el( RangeControl, {
                            label: __( 'Mobile text margin (px)', 'wem-image-text' ),
                            help: __( 'Adds space before the text when image is first, or after the text when content is first.', 'wem-image-text' ),
                            value: a.mobileTextMargin, min: 0, max: 48, step: 4,
                            onChange: function ( value ) {
                                if ( value !== undefined ) { set( { mobileTextMargin: Number( value ) } ); }
                            }
                        } ),
                        el( RangeControl, {
                            label: __( 'Image corner radius (px)', 'wem-image-text' ),
                            value: a.imageRadius, min: 0, max: 40, step: 2,
                            onChange: function ( value ) {
                                if ( value !== undefined ) { set( { imageRadius: Number( value ) } ); }
                            }
                        } )
                    )
                ),
                el( 'div', blockProps,
                    el( InnerBlocks, {
                        template: PARENT_TEMPLATE,
                        templateLock: 'all',
                        allowedBlocks: [ 'wem/image-text-media', 'wem/image-text-content' ]
                    } )
                )
            );
        },

        save: function ( props ) {
            var a = props.attributes;
            var blockProps = useBlockProps.save( {
                className: classNames( a ),
                style: {
                    '--wem-it-image-width': a.imageWidth + '%',
                    '--wem-it-gap': a.gap + 'px',
                    '--wem-it-radius': a.imageRadius + 'px',
                    '--wem-it-mobile-text-margin': a.mobileTextMargin + 'px'
                }
            } );
            return el( 'div', blockProps, el( InnerBlocks.Content ) );
        }
    } );

    registerBlockType( 'wem/image-text-media', {
        apiVersion: 3,
        title: __( 'WEM Image Text: Image', 'wem-image-text' ),
        category: 'design',
        icon: 'format-image',
        parent: [ 'wem/image-text' ],
        supports: { html: false, inserter: false, reusable: false },
        edit: function () {
            return el( 'div', useBlockProps( { className: 'wem-image-text__media' } ),
                el( InnerBlocks, {
                    template: [ [ 'core/image', { sizeSlug: 'large', linkDestination: 'none' } ] ],
                    templateLock: 'all',
                    allowedBlocks: [ 'core/image' ]
                } )
            );
        },
        save: function () {
            return el( 'div', useBlockProps.save( { className: 'wem-image-text__media' } ),
                el( InnerBlocks.Content )
            );
        }
    } );

    registerBlockType( 'wem/image-text-content', {
        apiVersion: 3,
        title: __( 'WEM Image Text: Content', 'wem-image-text' ),
        category: 'design',
        icon: 'text',
        parent: [ 'wem/image-text' ],
        supports: { html: false, inserter: false, reusable: false },
        edit: function () {
            return el( 'div', useBlockProps( { className: 'wem-image-text__content' } ),
                el( InnerBlocks, {
                    template: [
                        [ 'core/heading', { level: 3, placeholder: __( 'Add a heading…', 'wem-image-text' ) } ],
                        [ 'core/paragraph', { placeholder: __( 'Add your text…', 'wem-image-text' ) } ]
                    ],
                    templateLock: 'insert',
                    allowedBlocks: [
                        'core/heading', 'core/paragraph', 'core/list', 'core/buttons',
                        'core/quote', 'core/separator', 'core/spacer'
                    ]
                } )
            );
        },
        save: function () {
            return el( 'div', useBlockProps.save( { className: 'wem-image-text__content' } ),
                el( InnerBlocks.Content )
            );
        }
    } );
} )( window.wp );
