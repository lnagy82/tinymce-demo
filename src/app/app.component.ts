import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import tinymce from 'tinymce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  content?:string;

  tinymceinit = {
    plugins : [
      "advlist autolink lists link image media charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen",
      "insertdatetime nonbreaking save table contextmenu directionality",
      "emoticons template paste textcolor colorpicker textpattern"
    ],
    toolbar : 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    image_advtab : true,
    file_picker_callback : function(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
  
      // Note: In modern browsers input[type="file"] is functional without 
      // even adding it to the DOM, but that might not be the case in some older
      // or quirky browsers like IE, so you might want to add it to the DOM
      // just in case, and visually hide it. And do not forget do remove it
      // once you do not need it anymore.
  
      input.onchange = function() {
        var file = input.files[0];
  
        var reader = new FileReader();
        reader.onload = function () {
          // Note: Now we need to register the blob in TinyMCEs image blob
          // registry. In the next release this part hopefully won't be
          // necessary, as we are looking to handle it internally.
          var id = 'blobid' + (new Date()).getTime();
          var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
          var base64 = (reader.result as string).split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
  
          // call the callback and populate the Title field with the file name
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };
  
      input.click();
    }
  };
  
 
  title = 'tinymce-angular-demo';

  
}
