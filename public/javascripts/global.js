// An object literal
var filestactShopify = {
    format : null,
    size: null,
    frame: null,
    border: null,
    price: 0,
    description: null,

    myProperty: "hello",

    myMethod: function() {
        console.log(filestactShopify.myProperty);
    },

    runIndex: function() {
        $('#edit_API').click(function() {
            $(this).addClass('hide');
            $('#frmApi').removeClass('hide');

        });
        $('#cancel').click(function() {
            $('#frmApi').addClass('hide');
            $('#edit_API').removeClass('hide');
        });
    },

    runOrderForm: function() {

        $("#contact_number").intlTelInput({
            autoPlaceholder: 'polite',
            hiddenInput: "full_phone",
            allowExtensions: true,
            formatOnDisplay: true,
            autoFormat: false,
            autoHideDialCode: false,
            defaultCountry: "auto",
            nationalMode: true,
            numberType: "MOBILE",
            preventInvalidNumbers: true,
            separateDialCode: true,
            initialCountry: "auto",
            utilsScript: "../javascripts/intl-tel-input-16.0.0/build/js/utils.js",
            geoIpLookup: function(success, failure) {
                $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    success(countryCode);
                    var loc = resp.loc;
                    var arrLoc = loc.split(',');
                    $('#shipping_lat').val(arrLoc[0]);
                    $('#shipping_lon').val(arrLoc[1]);
                    $('#shipping_city').val(resp.city);
                    $('#shipping_province').val(resp.region);
                });
            }
        });

        $("#orderFrm").validate({
            rules: {
                contact_email: {
                    required: true,
                    email: true,
                    maxlength: 50
                },
                contact_number: {
                    required: true,
                    maxlength: 15
                },
                shipping_firstname: {
                    required: true,
                    maxlength: 50
                },
                shipping_lastname: {
                    required: true,
                    maxlength: 50
                },
                shipping_address: {
                    required: true,
                    maxlength: 300
                },
                shipping_city: {
                    required: true,
                    maxlength: 150
                },
                shipping_postal_code: {
                    required: true,
                    maxlength: 6
                }
            },
            messages: {
                contact_email: {
                    required: 'Email is required!',
                    email: 'Enter only valid email!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                contact_number: {
                    required: 'Phone number is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                shipping_firstname: {
                    required: 'Firstname is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                shipping_lastname: {
                    required: 'Lastname is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                shipping_address: {
                    required: 'Address is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                shipping_city: {
                    required: 'City is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                },
                shipping_postal_code: {
                    required: 'Postal code is required!',
                    maxlength: jQuery.validator.format("Only {0} characters required!")
                }
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'small',
            errorClass: 'form-text text-danger',
            errorPlacement: function(error, element) {
                if (element.attr("name") == "contact_number") {
                    error.insertAfter(".iti");
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                form.submit();
            }
        });
    },

    init: function(settings) {
        filestactShopify.settings = settings;
    },

    readSettings: function() {
        console.log(filestactShopify.settings);
    },

    checkTab: function() {
        $('.nav-fill .nav-item a').each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('disabled').removeAttr('tabindex aria-disabled');
            } else {
                $(this).addClass('disabled').attr({
                    "tabindex": "-1",
                    "aria-disabled": "true"
                });
            }
        });
    },

    setFormValue: function () {
        $("[name='variantFormat']").val(filestactShopify.getFormat());
        $("[name='variantSize']").val(filestactShopify.getSize());
        $("[name='variantFrame']").val(filestactShopify.getFrame());
        $("[name='variantBorder']").val(filestactShopify.getBorder());
        $("[name='productPrice']").val(filestactShopify.getPrice());
        $("[name='productDescription']").val(filestactShopify.getDescription());
    },

    setFormat: function (formatValue) {
        this.format = formatValue;
    },

    getFormat: function () {
        return filestactShopify.format;
    },

    setSize: function (sizeValue) {
        this.size = sizeValue;
    },

    getSize: function() {
        return filestactShopify.size;
    },

    setFrame: function(frameValue) {
        this.frame = frameValue;
    },

    getFrame: function() {
        return filestactShopify.frame;
    },

    setBorder: function(borderValue) {
        this.border = borderValue;
    },

    getBorder: function() {
        return filestactShopify.border;
    },

    setPrice: function(priceValue) {
        this.price = priceValue;
    },

    getPrice: function() {
        return filestactShopify.price;
    },

    setDescription: function(descriptionValue) {
        this.description = descriptionValue;
    },

    getDescription: function() {
        return filestactShopify.description;
    },

    runProductForm: function() {
        const formatOptions = {
            landscape: 16 / 10.5, //16:9
            portrait: 2.8 / 4, //4:3
            square: 1 / 1 //1:1
        };

        $('#upload').prop('disabled', true);
        $('#order-now').hide();

        filestactShopify.checkTab();
        filestactShopify.setFormValue();

        $('#variants li a').bind('click', function(event) {
            switch ($(this).text()) {
                case 'Size':
                    filestactShopify.setSize(filestactShopify.getSize());
                    frame = null;
                    border = null;
                    break;
                case 'Frame':
                    filestactShopify.setFrame(filestactShopify.getFrame());
                    border = null;
                    break;
                case 'Border':
                    filestactShopify.setBorder(filestactShopify.getBorder());
                    border = null;
                    break;
                default:
                    filestactShopify.setFormat(filestactShopify.getFormat());
                    size = null;
                    frame = null;
                    border = null;

                    $('.preview').empty().append('<img data-src="//cdn.shopify.com/s/files/1/1314/6345/t/31/assets/F_AppStep1.jpg?6454" src="//cdn.shopify.com/s/files/1/1314/6345/t/31/assets/F_AppStep1.jpg?6454" class="preview-image"/>');
                    $('.preview').find('.frame-image').remove();

                    $('#variants li:first-child a')
                        .removeClass('disabled')
                        .removeAttr('tabindex aria-disabled')
                        .tab('show');

                    filestactShopify.checkTab();
            }

            filestactShopify.populateStyles();
            filestactShopify.setFormValue();
        });

        $("input[name='aspect']").click(function() {
            var formatValue = $("input[name='aspect']:checked").val();
            filestactShopify.setFormat(formatValue);
            $('#upload').prop('disabled', false);
        });

        $(document).on("click", "input[name='dimensions']", function(e) {
            var sizeValue = $("input[name='dimensions']:checked").val();
            filestactShopify.setSize(sizeValue);
            filestactShopify.setFormValue();
            filestactShopify.populateStyles();
        });

        $(document).on("click", "#btnSizeSelect", function(e) {

            $('#variants li:nth-child(3) a')
                .removeClass('disabled')
                .removeAttr('tabindex aria-disabled')
                .tab('show');

            var frameTemp = '<legend>Choose your frame...</legend>';
            frameTemp += '<div class="form-group">' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="frame" id="frame-natural" value="natural" checked>' +
                '<label class="form-check-label" for="frame-natural">Natural</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="frame" id="frame-black" value="black">' +
                '<label class="form-check-label" for="frame-black">Black</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="frame" id="frame-white" value="white">' +
                '<label class="form-check-label" for="frame-white">White</label>' +
                '</div>' +
                '</div>';
            frameTemp += '<button id="btnFrameSelect" class="btn btn-primary">Select</button>';
            frameTemp += '<p>For a sleek, gallery style treatment we use a deep shadow box frame profile. Artwork is set back from the acrylic glazing, appearing to float in the frame.</p>';

            $('#frame').empty().append(frameTemp);

            filestactShopify.setFrame('natural');
            filestactShopify.populateStyles();
        });

        $(document).on("click", "input[name='frame']", function(e) {
            var frameValue = $("input[name='frame']:checked").val();
            console.log(frameValue + ' frame checked!');
            filestactShopify.setFrame(frameValue);
            filestactShopify.setFormValue();
            filestactShopify.populateStyles();
        });

        $(document).on("click", "#btnFrameSelect", function(e) {

            $('#variants li:last-child a')
                .removeClass('disabled')
                .removeAttr('tabindex aria-disabled')
                .tab('show');

            var borderTemp = '<legend>Choose your frame...</legend>' +
                '<div class="form-group">' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="border" id="border-fullImage" value="Full Image" checked>' +
                '<label class="form-check-label" for="border-fullImage">Full Image</label>' +
                '</div>' +
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="border" id="border-whiteBorder" value="White Border">' +
                '<label class="form-check-label" for="border-whiteBorder">White Border</label>' +
                '</div>' +
                '</div>';

            borderTemp += '<button id="btnBorderSelect" class="btn btn-primary">Select</button>';
            borderTemp += '<p>Frame your image right to the edge for a sleek contemporary look or allow some space around the image for a more traditional feel.</p>';

            $('#border').empty().append(borderTemp);

            filestactShopify.setBorder('Full Image');
            filestactShopify.populateStyles();
        });

        $(document).on("click", "input[name='border']", function(e) {
            var borderValue = $("input[name='border']:checked").val();
            filestactShopify.setBorder(borderValue);
            filestactShopify.setFormValue();
            filestactShopify.populateStyles();
        });

        $(document).on("click", "#btnBorderSelect", function(e) {
            $('#order-now').show();
            filestactShopify.setFormValue();
        });

        $(document).on("click", "#onUpload", function(e) {
            const client = filestack.init(filestactShopify.settings.filestackAPI);

            const options = {
                uploadInBackground: false,
                transformations: {
                    crop: {
                        aspectRatio: formatOptions[filestactShopify.getFormat()],
                        force: true
                    },
                    circle: false,
                    rotate: false,
                },
                accept: [
                    "image/*"
                ],
                onFileSelected: file => {
                    // If you throw any error in this function it will reject the file selection.
                    // The error message will be displayed to the user as an alert.
                    if (file.size > 1000 * 1000) {
                        throw new Error('File too big, select something smaller than 1MB');
                    }
                },
                onUploadDone: (res) => {
                    var uploadedFile = res.filesUploaded[0];
                    // console.log(uploadedFile.filename);
                    $('.preview').empty();
                    $('<img class="preview-image" src="' + uploadedFile.url + '"/>').appendTo('.preview');
                    $("[name='variantImageUrl']").val(uploadedFile.url);

                    var dimensionTemp = '<legend>Choose your size...</legend>';

                    var selectedFormat = filestactShopify.getFormat();
                    switch (selectedFormat) {
                        case 'landscape':
                            dimensionTemp += '<div class="form-group">' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-40x30cm" value="40x30cm" checked>' +
                                '<label class="form-check-label" for="dimensions-40x30cm">40x30cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-60x40cm" value="60x40cm">' +
                                '<label class="form-check-label" for="dimensions-60x40cm">60x40cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-100x66cm" value="100x66cm">' +
                                '<label class="form-check-label" for="dimensions-100x66cm">100x66cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-120x80cm" value="120x80cm">' +
                                '<label class="form-check-label" for="dimensions-120x80cm">120x80cm</label>' +
                                '</div>' +
                                '</div>';
                                filestactShopify.setSize('40x30cm');
                            break;
                        case 'portrait':
                            dimensionTemp += '<div class="form-group">' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-30x40cm" value="30x40cm" checked>' +
                                '<label class="form-check-label" for="dimensions-30x40cm">30x40cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-40x60cm" value="40x60cm">' +
                                '<label class="form-check-label" for="dimensions-40x60cm">40x60cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-66x100cm" value="66x100cm">' +
                                '<label class="form-check-label" for="dimensions-66x100cm">66x100cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-80x120cm" value="80x120cm">' +
                                '<label class="form-check-label" for="dimensions-80x120cm">80x120cm</label>' +
                                '</div>' +
                                '</div>';
                                filestactShopify.setSize('30x40cm');
                            break;
                        default: //square
                            dimensionTemp += '<div class="form-group">' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-30x30cm" value="30x30cm" checked>' +
                                '<label class="form-check-label" for="dimensions-30x30cm">30x30cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-50x50cm" value="50x50cm">' +
                                '<label class="form-check-label" for="dimensions-50x50cm">50x50cm</label>' +
                                '</div>' +
                                '<div class="form-check form-check-inline">' +
                                '<input class="form-check-input" type="radio" name="dimensions" id="dimensions-90x90cm" value="90x90cm">' +
                                '<label class="form-check-label" for="dimensions-90x90cm">90x90cm</label>' +
                                '</div>' +
                                '</div>';
                                filestactShopify.setSize('30x30cm');
                    }
                    dimensionTemp += '<button id="btnSizeSelect" class="btn btn-primary">Select</button>';
                    dimensionTemp += '<p>Whether you are looking to make a big impact in your living room or create something smaller for your bedside table, these sizes should have it covered. </p>' +
                        '<p>Contact us for custom sizes.</p>';
                    $('#size').empty().append(dimensionTemp);

                    filestactShopify.setFormValue();
                    filestactShopify.populateStyles();

                    $('#variants li:nth-child(2) a')
                        .removeClass('disabled')
                        .removeAttr('tabindex aria-disabled')
                        .tab('show');

                },
            };

            client.picker(options).open();
        });
    },
        /*
            @todo:
                unset var value on switching
        */

    populateStyles: function() {
        var wrapClass = null;
        var wrapFrame = null;
        /*
        Load Format Aspects
        landscape/portrait/square
        */
        switch (filestactShopify.getFormat()) {
            case 'landscape':
                /*Let's Check if there is any sizes seected*/
                if (filestactShopify.getSize()) {
                    /*
                    Load Dimensions
                    30x20cm/60x40cm/90x60cm/120x80
                    */
                    switch (filestactShopify.getSize()) {
                        case '40x30cm':
                            wrapClass = 'mm300x200';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_300x200_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('110');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm300x200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_300x200_Black.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_300x200_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Border/Frame_300x200_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm300x200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_300x200_White.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_300x200_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Border/Frame_300x200_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm300x200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_300x200_Oak.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_300x200_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Border/Frame_300x200_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                        case '60x40cm':
                            wrapClass = 'mm600x400';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_600x400_Oak.png';

                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('180');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm600x400';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_600x400_Black.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x400';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_600x400_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x400b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Border/Frame_600x400_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm600x400';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_600x400_White.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x400';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_600x400_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x400b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Border/Frame_600x400_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm600x400';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_600x400_Oak.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x400';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_600x400_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x400b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Border/Frame_600x400_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                        case '100x66cm':
                            wrapClass = 'mm900x600';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_900x600_Oak.png';

                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('290');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm900x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_900x600_Black.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_900x600_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Border/Frame_900x600_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm900x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_900x600_White.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_900x600_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Border/Frame_900x600_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm900x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_900x600_Oak.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_900x600_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Border/Frame_900x600_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                            /*Default: 120x80*/
                        default:
                            wrapClass = 'mm1200x800';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_1200x800_Oak.png';

                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('550');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm1200x800';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_1200x800_Black.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm1200x800';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Frame_1200x800_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm1200x800b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Black/Border/Frame_1200x800_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm1200x800';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_1200x800_White.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm1200x800';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Frame_1200x800_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm1200x800b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/White/Border/Frame_1200x800_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm1200x800';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_1200x800_Oak.png';

                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm1200x800';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Frame_1200x800_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm1200x800b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/landscape/Oak/Border/Frame_1200x800_Oak_B.png';
                                            }
                                        }
                                }
                            }
                    }
                }
                break;
            case 'portrait':
                /*Let's Check if there is any sizes seected*/
                if (filestactShopify.getSize()) {
                    /*
                    Load Dimensions
                    20x30cm/40x60cm/60x90cm/80x120
                    */
                    switch (filestactShopify.getSize()) {
                        case '30x40cm':
                            wrapClass = 'mm200x300';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_200x300_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('110');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm200x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_200x300_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm200x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_200x300_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm200x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Border/Frame_200x300_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm200x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_200x300_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm200x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_200x300_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm200x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Border/Frame_200x300_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm200x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_200x300_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm200x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_200x300_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm200x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Border/Frame_200x300_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                        case '40x60cm':
                            wrapClass = 'mm400x600';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_400x600_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('180');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm400x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_400x600_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm400x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_400x600_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm400x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Border/Frame_400x600_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm400x600';
                                        wrapFrame = forWardingAddress + '/images/portrait/White/Frame_400x600_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm400x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_400x600_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm400x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Border/Frame_400x600_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm400x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_400x600_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm400x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_400x600_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm400x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Border/Frame_400x600_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                        case '66x100cm':
                            wrapClass = 'mm600x900';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_600x900_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('290');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm600x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_600x900_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_600x900_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Border/Frame_600x900_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm600x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_600x900_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_600x900_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Border/Frame_600x900_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm600x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_600x900_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_600x900_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Border/Frame_600x900_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                            /*Default: 80x120*/
                        default:
                            wrapClass = 'mm800x1200';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_800x1200_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('550');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm800x1200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_800x1200_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm800x1200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Frame_800x1200_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm800x1200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Black/Border/Frame_800x1200_Black _B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm800x1200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_800x1200_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm800x1200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Frame_800x1200_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm800x1200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/White/Border/Frame_800x1200_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm800x1200';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_800x1200_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm800x1200';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Frame_800x1200_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm800x1200b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/portrait/Oak/Border/Frame_800x1200_Oak_B.png';
                                            }
                                        }
                                }
                            }
                    }
                }
                break;
                /*Default: square*/
            default:
                /*Let's Check if there is any sizes seected*/
                if (filestactShopify.getSize()) {
                    /*
                    Load Dimensions
                    60x60cm/90x90cm/30x30cm
                    */
                    switch (filestactShopify.getSize()) {
                        case '30x30cm':
                            wrapClass = 'mm300x300';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_300x300_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('110');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm300x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_300x300_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_300x300_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Border/Frame_300x300_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm300x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_300x300_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_300x300_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Border/Frame_300x300_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm300x300';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_300x300_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm300x300';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_300x300_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm300x300b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Border/Frame_300x300_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                        case '90x90cm':
                            wrapClass = 'mm900x900';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_900x900_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('290');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm900x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_900x900_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_900x900_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Border/Frame_900x900_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm900x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_900x900_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_900x900_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Border/Frame_900x900_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm900x900';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_900x900_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm900x900';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_900x900_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm900x900b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Black/Frame_900x900_Oak_B.png';
                                            }
                                        }
                                }
                            }
                            break;
                            /*Default: 60x60cm*/
                        default:
                            wrapClass = 'mm600x600';
                            wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_600x600_Oak.png';
                            filestactShopify.setDescription('Printed, framed & delivered');
                            filestactShopify.setPrice('180');

                            if (filestactShopify.getFrame()) {
                                /*
                                Load Frame Color
                                black/white/natural
                                */
                                switch (filestactShopify.getFrame()) {
                                    case 'black':
                                        wrapClass = 'zoomed mm600x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_600x600_Black.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Frame_600x600_Black.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Black/Border/Frame_600x600_Black_B.png';
                                            }
                                        }
                                        break;
                                    case 'white':
                                        wrapClass = 'zoomed mm600x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_600x600_White.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Frame_600x600_White.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/White/Border/Frame_600x600_White_B.png';
                                            }
                                        }
                                        break;
                                        /*Default: Natural*/
                                    default:
                                        wrapClass = 'zoomed mm600x600';
                                        wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_600x600_Oak.png';
                                        if (filestactShopify.getBorder()) {
                                            /*
                                            Load Border Style
                                            Full Image/White Border
                                            */
                                            switch (filestactShopify.getBorder()) {
                                                case 'Full Image':
                                                    wrapClass = 'zoomed mm600x600';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Frame_600x600_Oak.png';
                                                    break;
                                                    /*Default: White Border*/
                                                default:
                                                    wrapClass = 'zoomed mm600x600b';
                                                    wrapFrame = filestactShopify.settings.forWardingAddress + '/images/square/Oak/Border/Frame_600x600_Oak_B.png';
                                            }
                                        }
                                }
                            }
                    }
                }
        }

        $('.preview').removeClass('zoomed mm300x200 mm600x400 mm900x600 mm1200x800 mm200x300 mm400x600 mm600x900 mm800x1200 mm300x300 mm600x600 mm900x900 mm300x300b mm200x300b mm300x200b mm300x200b mm600x400b mm900x600b mm1200x800b mm200x300b mm400x600b mm600x900b mm800x1200b mm900x900b mm600x600b').addClass(wrapClass);

        $('.frame-image').remove();
        $('<img class="frame-image" src="' + wrapFrame + '"/>').appendTo('.preview');
    }

};