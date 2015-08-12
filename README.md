# portrait-cutting
html 5 canvas base64 avatar cutting


$(element).portrait({
    limit: 1024 * 1024 * 1,
    canvas: { width: 360, height: 270, result: 500 },
    lang: {
        reupload: 'Re upload',
        save: 'Save picture',
        cancel: 'Cancel',
        failure: 'update failure',
        success: 'update success',
        filetype: 'please select picture file',
        limit: 'file size must less than 2M',
        leftitle: 'Adjust avatar',
        leftip: 'Drag the box to adjust the position and dimensions.',
        rightitle: 'Preview',
        rightip: 'Avatar preview',
        title: 'Show your best avatar',
        del: 'delete',
        none: 'Please upload a picture',
        min: 'Avatar size min-width 30px'
    },
    fun: function (file) {
        $('.user-face').html('<img src="{0}" style="width:300px;height:300px" />'.format(file));
    },
    cancel: function () {
        alert('click cancel')
    }
});
    limit       :   file zise( KB )
    canvas      :   
        width   :   canvas width
        height  :   canvas height
    lang        :   language
    fun         :   save button callback function, Base64
    cancel      :   cancel button callback function
