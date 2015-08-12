(function ($) {
    $.fn.extend({
        portrait: function (ini) {
            $(this).hover(function () {
                
            });
            //var lang = this.lang || {
            //    reupload: 'Re upload',
            //    save: 'Save picture',
            //    cancel: 'Cancel',
            //    failure: 'update failure',
            //    success: 'update success',
            //    filetype: 'please select picture file',
            //    limit: 'file size must less than 3M'
            //};
            //$(this).html('<div class="head-portrait"><div class="head-portrait-choose"><input type="file" name="head-portrait-file" accept="image/gif,image/jpeg,image/x-png" id="uploadHolderPortrait" /></div><div class="head-portrait-holder"><div class="head-portrait-light"></div></div><div class="head-portrait-preview"><div class="head-portrait-preview-150"></div><div class="head-portrait-preview-80"></div><div class="head-portrait-preview-50"></div><div class="head-portrait-preview-25"></div></div><div class="head-portrait-foot"><input class="head-portrait-buttom head-portrait-hide" type="button" value="{0}" /><input class="head-portrait-reupload head-portrait-hide" type="button" value="{1}" /><input class="head-portrait-cancel head-portrait-hide" type="button" value="{2}" /></div></div>'.format(
            //    lang.save,
            //    lang.reupload,
            //    lang.cancel
            //    ));
            //var max = ini.limit || 1024 * 1024;
            //$('input[name=head-portrait-file]').change(function () {
            //    var file = this.files[0];
            //    if (file.size > max) {
            //        alert(lang.limit);
            //        return true;
            //    };
            //    if (!/image\/\w+/.test(file.type)) {
            //        alert(lang.filetype);
            //        return true;
            //    }
            //    $('.head-portrait-choose').fadeOut(500);
            //    $('.head-portrait-holder').fadeIn(500);
            //    imgstream(file);
            //    $('.head-portrait-reupload,.head-portrait-buttom,.head-portrait-cancel').show();
            //});
            //$('.head-portrait-reupload,.head-portrait-cancel').click(function () {
            //    $('.head-portrait-buttom,.head-portrait-cancel,.head-portrait-reupload').hide();
            //    $('.head-portrait-holder').fadeOut(500);
            //    $('.head-portrait-choose').fadeIn(500);
            //    $('.head-portrait-preview div').html('');
            //});
        }
    });
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    };
    var imgsize = function (width, height, holderWidth, holderHeight) {
        var w = holderWidth, h = holderHeight;
        if (width / height >= holderWidth / holderHeight) {
            if (width > holderWidth) {
                w = holderWidth;
                h = (holderWidth / width) * height;
            }
        } else {
            if (height > holderHeight) {
                h = holderHeight;
                w = (holderHeight / height) * width;
            }
        }
        return { width: w, height: h, ratio: width / w };
    };
    var imgstream = function (file) {
        var __ = this;
        var img = new Image();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            var url = this.result;
            img.src = url;
            img.onload = function () {
                var width = this.width, height = this.height;
                var dorp = imgsize(width, height, 400, 400);
                var left = parseInt((400 - dorp.width) / 2);
                var top = parseInt((400 - dorp.height) / 2);
                $('.head-portrait-light').html('<img src="{0}" style="width: {1}px;height: {2}px" />'.format(url, parseInt(dorp.width), parseInt(dorp.height)));
                $('.head-portrait-light').css({ top: top + 'px', left: left + 'px' });
                $('.head-portrait-preview div').each(function () {
                    $(this).html('<img src="{0}" />'.format(url));
                });
                var p = dorp.width >= dorp.height ? dorp.height : dorp.width;
                var size = parseInt(__.reupload ? p : p / 2);
                var x = (dorp.width - size) / 2, y = (dorp.height - size) / 2, x1 = x + size, y1 = y + size;
                $('.image-shear-foot').show();
                $('.head-portrait-light img').Jcrop({ onChange: showPreview, onSelect: showPreview, aspectRatio: 1, setSelect: [x, y, x1, y1] });
                function showPreview(coords) {
                    var X1 = parseInt(coords.x * dorp.ratio), Y1 = parseInt(coords.y * dorp.ratio), X2 = parseInt(coords.x2 * dorp.ratio), Y2 = parseInt(coords.y2 * dorp.ratio), RectWidth = parseInt(coords.w * dorp.ratio), RectHeight = parseInt(coords.h * dorp.ratio), Scaling = dorp.ratio;
                    if (parseInt(coords.w) > 0) {
                        var s = [150, 80, 50, 25];
                        $('.head-portrait-preview img').each(function (index) {
                            var rx = s[index] / coords.w;
                            var ry = s[index] / coords.h;
                            $(this).css({
                                width: Math.round(rx * dorp.width) + 'px',
                                height: Math.round(ry * dorp.height) + 'px',
                                marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                                marginTop: '-' + Math.round(ry * coords.y) + 'px'
                            });
                        });
                    }
                    var cvs = document.createElement('canvas');
                    var size = __.size || 300;
                    size = size < 10 ? 100 : size;
                    cvs.width = size;
                    cvs.height = size;
                    var con = cvs.getContext('2d');
                    con.clearRect(0, 0, size, size);
                    con.drawImage(img, X1, Y1, RectWidth, RectHeight, 0, 0, size, size);
                    var base64 = cvs.toDataURL('image/jpeg', 0.5);
                };
            };
        };
        reader.readAsDataURL(file);
    };
})(jQuery);